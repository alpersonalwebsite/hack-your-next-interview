#!/usr/bin/env node
/**
 * Check the links in these notes.
 *
 * The history of this repository is full of commits called "re-pathing",
 * "playing with paths" and "Fixing links refs", which is what maintaining links
 * by hand looks like. It also shipped one that was simply wrong:
 * `[hackerrank](www.hackerrank.com/)`, with no scheme, which GitHub resolves as a
 * path inside the repository. A dead link is a silent failure, because the only
 * way to find it by reading is to click it.
 *
 * TWO MODES, split by what makes a link rot.
 *
 * Default, and safe to run on every push: everything that can be answered from
 * the files on disk.
 *   - a relative link or image resolves to a file that exists,
 *   - an anchor names a heading that exists, using GitHub's slug rules,
 *   - a link with no scheme that looks like a hostname is reported, because that
 *     is the mistake above and nothing else catches it.
 *
 * `--external`, for a scheduled run: every http(s) URL, plus the GitHub-relative
 * cross-repository links (`../../../other-repo/blob/master/x.md`), which are not
 * filesystem paths at all and can only be checked over the network.
 *
 * WHY THE SPLIT. An external link rots as a function of ELAPSED TIME, not of
 * commits. A check that only runs on push would look on the days the repository
 * happens to be edited, which for this one meant nothing between 2021 and now.
 * A monthly job is the thing that finds it. The default mode stays offline so it
 * can run on every push without depending on the network.
 *
 * 403 and 429 are reported as UNCHECKED rather than broken. They mean a server
 * declined to answer, which is not the same as a missing page, and treating them
 * as failures trains people to ignore this check.
 */

import { execFileSync } from 'node:child_process'
import { existsSync, readFileSync } from 'node:fs'
import { dirname, join, normalize, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const repo = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const external = process.argv.includes('--external')
const files = execFileSync('git', ['-C', repo, 'ls-files', '*.md'], { encoding: 'utf8' })
  .split('\n').filter(Boolean).sort()

/**
 * The owner segment for a GitHub-relative cross-repository link, read from the
 * remote rather than hard-coded. `../../../other-repo/blob/master/x.md` in a file
 * at the repository root resolves against
 * `/<owner>/<this-repo>/blob/master/`, so three levels up lands on `/<owner>/`.
 * Leaving the owner out produces github.com/<other-repo>/..., which 404s for
 * every link and looks exactly like three broken links. Measured: that is what
 * the first version of this script reported.
 */
function ownerFromRemote() {
  try {
    const url = execFileSync('git', ['-C', repo, 'remote', 'get-url', 'origin'], { encoding: 'utf8' }).trim()
    const m = /github\.com[:/]([^/]+)\//.exec(url)
    return m ? m[1] : null
  } catch {
    return null
  }
}
const owner = ownerFromRemote()

/** GitHub's heading slug: trimmed ONCE up front, then punctuation dropped, then spaces to hyphens. */
const slug = (heading) =>
  heading.trim().toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s/g, '-')

const headings = new Map()
for (const file of files) {
  const found = new Set()
  let inFence = false
  for (const line of readFileSync(join(repo, file), 'utf8').split('\n')) {
    if (/^```/.test(line)) { inFence = !inFence; continue }
    if (inFence) continue
    const m = /^#{1,6}\s+(.*?)\s*$/.exec(line)
    if (m) found.add(slug(m[1]))
  }
  headings.set(file, found)
}

const failures = []
const unchecked = []
let localCount = 0
let anchorCount = 0
const remote = []

for (const file of files) {
  const text = readFileSync(join(repo, file), 'utf8')
  for (const m of text.matchAll(/!?\[[^\]]*\]\(([^)\s]+)\)/g)) {
    const target = m[1]

    if (/^https?:\/\//i.test(target)) {
      remote.push({ file, target })
      continue
    }
    // A GitHub-relative cross-repository link: not a path on disk, so it is only
    // answerable over the network.
    if (target.startsWith('../../../')) {
      // The owner is needed only to BUILD the URL, so only --external needs it.
      // Requiring it unconditionally made the default offline run fail in any
      // clone whose origin is not a github.com URL, a local path included, which
      // is measurably what a fresh `git clone /path/to/repo` produces.
      const url = owner ? `https://github.com/${owner}/${target.replace(/^(\.\.\/)+/, '')}` : null
      remote.push({ file, target, url })
      continue
    }
    if (/^[\w.-]+\.(com|org|net|io|dev)(\/|$)/i.test(target)) {
      failures.push(`${file}: \`${target}\` has no scheme, so it resolves as a path inside this repository`)
      continue
    }

    const [path, anchor] = target.split('#')
    let inFile = file
    if (path !== '') {
      localCount++
      inFile = normalize(join(dirname(file), path))
      if (!existsSync(join(repo, inFile))) {
        failures.push(`${file}: link to \`${target}\`, but ${inFile} does not exist`)
        continue
      }
    }
    if (anchor) {
      anchorCount++
      const known = headings.get(inFile)
      if (!known) {
        failures.push(`${file}: anchor \`#${anchor}\` into ${inFile}, which this script did not read`)
      } else if (!known.has(anchor)) {
        failures.push(`${file}: \`${target}\`, but ${inFile} has no heading slugging to \`${anchor}\``)
      }
    }
  }
}

console.log(
  `${files.length} notes files: ${localCount} relative link(s), ${anchorCount} anchor(s), ` +
    `${remote.length} remote link(s) ${external ? 'to check' : 'not checked'}`,
)

if (external) {
  const UNCHECKABLE = new Set([403, 429])
  for (const { file, target, url } of remote) {
    if (url === null) {
      unchecked.push(`${file}: ${target} needs the GitHub owner to resolve, and this clone's origin does not give one`)
      continue
    }
    const href = url ?? target
    let status = 0
    try {
      // HEAD first, then GET on ANY unsuccessful status rather than only on 405.
      // An earlier version of this retried on 405 alone, on the reasoning that
      // other codes are real answers. Measured counter-example in this very
      // repository: https://www.hackerrank.com/ answers 500 to HEAD and 200 to
      // GET. A server that dislikes HEAD does not have to say 405 about it, so
      // the narrow rule reported a live site as broken. The retry costs one extra
      // request per link that was going to be reported anyway.
      const head = execFileSync('curl', ['-s', '-o', '/dev/null', '-w', '%{http_code}', '-I',
        '--max-time', '25', '-L', href], { encoding: 'utf8' })
      status = Number(head.trim())
      if (!(status >= 200 && status < 400)) {
        const get = execFileSync('curl', ['-s', '-o', '/dev/null', '-w', '%{http_code}',
          '--max-time', '25', '-L', href], { encoding: 'utf8' })
        status = Number(get.trim())
      }
    } catch {
      status = 0
    }
    if (status >= 200 && status < 400) continue
    if (UNCHECKABLE.has(status)) {
      unchecked.push(`${file}: ${href} answered ${status}, which means it declined to say`)
      continue
    }
    failures.push(`${file}: ${href} answered ${status || 'nothing (connection failed)'}`)
  }
  console.log(`  ${remote.length - failures.length - unchecked.length} reachable, ${unchecked.length} unchecked`)
}

for (const u of unchecked) console.log(`  unchecked: ${u}`)

if (failures.length === 0) {
  console.log('all links resolve')
  process.exit(0)
}
console.error(`\n${failures.length} problem(s):`)
for (const f of failures) console.error(`  ${f}`)
process.exit(1)
