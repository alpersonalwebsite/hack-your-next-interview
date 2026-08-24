#!/usr/bin/env node
/**
 * Run every JavaScript sample in these notes and check its documented output.
 *
 * These are interview answers. A sample that does not run, or that prints
 * something other than what the page says it prints, teaches the wrong thing at
 * the worst possible moment. When this was first written the notes did not pass:
 * one sample's function was named `ç` and called `fibonacci`, a merge helper
 * consumed its inputs, four palindrome solutions failed the requirement stated
 * three lines above them, and most documented output had been captured in a
 * browser console rather than in node.
 *
 * WHAT IT DOES with each fenced `js` / `javascript` block (tag matched
 * CASE-INSENSITIVELY: this repository uses `js`, `javascript` and `JavaScript`,
 * and a case-sensitive match would silently skip whole files):
 *
 *   1. writes it to a temporary .mjs file, so it runs as a MODULE and therefore
 *      in strict mode,
 *   2. runs it and fails on a non-zero exit,
 *   3. compares its stdout, line for line, with the output documented for it.
 *
 * STRICT MODE IS DELIBERATE. Several samples here assigned to undeclared
 * variables (`for (char of str)`, `j = str.length - 1`, `leftPointer = 0`),
 * which is legal in a sloppy-mode script and creates an implicit global. Under a
 * module it is a ReferenceError. Running these as modules is the harsher choice
 * and the right one for a repository about interviews, because an implicit
 * global is exactly what an interviewer flags.
 *
 * WHERE THE EXPECTED OUTPUT COMES FROM, in this order:
 *
 *   a. the first BARE fenced block after the sample, if it comes before the next
 *      tagged block. `Result:` / `Output:` / `## Result:` lines in between are
 *      skipped. This is the dominant convention in these notes.
 *   b. otherwise, a run of `//` comments at COLUMN ZERO placed directly under a
 *      top-level statement. Column zero is what stops a comment inside a
 *      function body from being read as program output.
 *   c. otherwise, a trailing comment on a `console.log` line itself, as in
 *      `console.log(a, b); // 1 2`, which is the tidiest form for one line of
 *      output. Restricted to lines containing `console.log(` on purpose: without
 *      that, any explanatory trailing comment anywhere would be read as an
 *      expected result.
 *
 * A block with neither must print nothing. If it prints anything, that is
 * reported rather than ignored: an undocumented line is how a sample drifts.
 *
 * THREE MARKERS, as the first line of a block, for the cases where running it is
 * not the point:
 *
 *   // check: skip <reason>       a fragment, a regex on its own, one of two
 *                                alternative spellings of the same thing. The
 *                                REASON IS REQUIRED, so a skip has to be argued
 *                                for rather than reached for.
 *   // check: throws <ErrorName>  the sample demonstrates a failure. The error
 *                                is asserted, so "it throws" cannot silently
 *                                become "it throws something else".
 *   // check: continues          concatenate onto the previous checked block in
 *                                this file, for a sample built up in stages.
 */

import { execFileSync } from 'node:child_process'
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const repo = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const files = execFileSync('git', ['-C', repo, 'ls-files', '*.md'], { encoding: 'utf8' })
  .split('\n')
  .filter(Boolean)
  .sort()

const failures = []
const fail = (where, message, detail) => failures.push({ where, message, detail })

const JS_TAGS = new Set(['js', 'javascript'])
// Tags that are shell or plain text rather than samples: counted and reported,
// never compiled. Anything outside this set and JS_TAGS is a failure rather than
// a silent skip, because an unrecognised tag is how a whole file stops being
// checked while the exit code stays 0.
const SKIP_TAGS = new Set(['sh', 'text'])
const RESULT_LINE = /^\s*(#{1,6}\s*)?(result|output|results|and the output will be|example logs result)\s*:?\s*$/i
// `Result: \`[ 0, 1, 2, 3 ]\`` on a prose line, the third convention these notes
// use, for a single line of output that does not deserve a whole fenced block.
const INLINE_RESULT = /^\s*(?:\*\*)?(?:result|output|default output|outputs)(?:\*\*)?\s*:\s*`([^`]+)`\s*\.?\s*$/i

/** Fenced blocks in document order: tag, 1-based opening line, body. */
function blocks(text, file) {
  const lines = text.split('\n')
  const found = []
  let open = null
  for (let i = 0; i < lines.length; i++) {
    const m = /^```(\S*)\s*$/.exec(lines[i])
    if (m) {
      if (open === null) open = { tag: m[1], line: i + 1, body: [] }
      else {
        found.push({ ...open, source: open.body.join('\n'), endLine: i + 1 })
        open = null
      }
    } else if (open !== null) {
      open.body.push(lines[i])
    }
  }
  if (open !== null) fail(`${file}:${open.line}`, 'unterminated ``` fence')
  return found
}

/**
 * The bare block that documents a sample's output, if there is one: the next
 * fence after it, bare-tagged, with only blank or Result:-style lines between.
 */
function followingOutput(all, index, lines) {
  const here = all[index]
  const next = all[index + 1]
  if (!next || next.tag !== '') return null
  for (let l = here.endLine; l < next.line - 1; l++) {
    const line = lines[l] ?? ''
    if (line.trim() === '' || RESULT_LINE.test(line)) continue
    return null
  }
  return next
}

/**
 * Inline expectations, in source order: either a `//` run at column zero under a
 * top-level statement, or a trailing comment on a `console.log` line.
 */
function inlineExpectations(source) {
  const lines = source.split('\n')
  const out = []
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    if (/^\/\//.test(line)) continue

    // Trailing form. Gated on `console.log(` so an ordinary explanatory comment
    // cannot be mistaken for an expected result.
    // `(?!\s)` is a LOOKAHEAD, not `^\S`. Consuming the first character means a
    // `console.log(` sitting at column zero can never be matched afterwards,
    // which is measurably what happened: the four samples in
    // basic-questions-and-challenges.md that document their output this way were
    // reported as documenting nothing at all.
    const trailing = /^(?!\s).*console\.log\(.*\/\/ ?(.*)$/.exec(line)
    if (trailing) {
      out.push({ tsLine: i + 1, expected: [trailing[1].replace(/\s+$/, '')] })
      continue
    }

    if (!/^\S.*[);]\s*$/.test(line)) continue
    const run = []
    let j = i + 1
    while (j < lines.length && /^\/\/( |$)/.test(lines[j])) {
      run.push(lines[j].replace(/^\/\/ ?/, '').replace(/\s+$/, ''))
      j++
    }
    if (run.length > 0) out.push({ tsLine: i + 1, expected: run })
    i = j - 1
  }
  return out
}

function marker(source) {
  const first = source.split('\n').find((l) => l.trim() !== '') ?? ''
  const m = /^\s*\/\/\s*check:\s*(skip|throws|continues)\b\s*(.*)$/.exec(first)
  if (!m) return null
  return { kind: m[1], rest: m[2].trim() }
}

const work = mkdtempSync(join(tmpdir(), 'hyni-samples-'))
let total = 0
let ran = 0
let skipped = 0
let threw = 0
let continued = 0
let claims = 0
let bare = 0
let unchecked = 0
let nonSample = 0

for (const file of files) {
  const text = readFileSync(join(repo, file), 'utf8')
  const lines = text.split('\n')
  const all = blocks(text, file)
  let carry = ''

  for (let idx = 0; idx < all.length; idx++) {
    const b = all[idx]
    if (b.tag === '') {
      bare++
      continue
    }
    if (SKIP_TAGS.has(b.tag.toLowerCase())) {
      nonSample++
      continue
    }
    if (!JS_TAGS.has(b.tag.toLowerCase())) {
      // Named, never ignored: an unrecognised tag is how a whole file stops
      // being checked while the exit code stays 0.
      fail(`${file}:${b.line}`, `unrecognised fence tag \`${b.tag}\`; expected js, javascript, or one of ${[...SKIP_TAGS].join(', ')}`)
      continue
    }

    total++
    const mark = marker(b.source)
    if (mark?.kind === 'skip') {
      if (!mark.rest) {
        fail(`${file}:${b.line}`, '`// check: skip` with no reason given')
      }
      skipped++
      continue
    }

    const program = mark?.kind === 'continues' ? `${carry}\n${b.source}` : b.source
    if (mark?.kind === 'continues') continued++
    carry = program

    const path = join(work, `${file.replace(/[^\w]/g, '_')}_L${b.line}.mjs`)
    writeFileSync(path, `${program}\n`)

    let stdout = ''
    let crashed = null
    try {
      stdout = execFileSync(process.execPath, [path], { stdio: 'pipe', encoding: 'utf8' })
      ran++
    } catch (err) {
      crashed = `${err.stdout ?? ''}${err.stderr ?? ''}`
      stdout = err.stdout ?? ''
    }

    if (mark?.kind === 'throws') {
      const want = mark.rest
      if (!want) {
        fail(`${file}:${b.line}`, '`// check: throws` with no error name')
      } else if (crashed === null) {
        fail(`${file}:${b.line}`, `expected to throw ${want}, but it exited 0`)
      } else if (!new RegExp(`(^|\\n)${want}\\b`).test(crashed)) {
        const got = crashed.split('\n').find((l) => /^[A-Za-z]*Error/.test(l)) ?? '(no error line)'
        fail(`${file}:${b.line}`, `expected ${want}`, `actual: ${got}`)
      } else {
        threw++
      }
      continue
    }

    if (crashed !== null) {
      const line = crashed.split('\n').find((l) => /^[A-Za-z]*Error/.test(l)) ?? crashed.split('\n')[0]
      fail(`${file}:${b.line}`, 'sample does not run', line)
      continue
    }

    // Expected output: the following bare block, else inline comments.
    const outBlock = followingOutput(all, idx, lines)
    let expected = null
    let anchor = b.line
    if (outBlock) {
      expected = outBlock.source.split('\n')
      // Trailing blank lines only. A LEADING blank line is real output when a
      // sample logs a template literal that starts with a newline, so trimming
      // it would make the documented block permanently disagree with the program
      // and leave nothing able to fix it.
      while (expected.length && expected[expected.length - 1].trim() === '') expected.pop()
      anchor = outBlock.line
    } else {
      // An inline `Result: \`value\`` line, within a couple of lines of the block.
      for (let l = b.endLine; l < Math.min(b.endLine + 3, lines.length); l++) {
        const m = INLINE_RESULT.exec(lines[l] ?? '')
        if (m) {
          expected = [m[1]]
          anchor = l + 1
          break
        }
        if ((lines[l] ?? '').trim() !== '') break
      }
      if (expected === null) {
        const runs = inlineExpectations(b.source)
        if (runs.length > 0) {
          expected = runs.flatMap((r) => r.expected)
          anchor = b.line + runs[0].tsLine
        }
      }
    }

    const actual = stdout.split('\n')
    while (actual.length && actual[actual.length - 1] === '') actual.pop()

    if (expected === null) {
      if (actual.length > 0) {
        fail(
          `${file}:${b.line}`,
          'sample prints output that nothing documents',
          `first line: ${JSON.stringify(actual[0])}`,
        )
      } else {
        unchecked++
      }
      continue
    }

    const limit = Math.max(expected.length, actual.length)
    let matched = 0
    for (let i = 0; i < limit; i++) {
      const want = expected[i]
      const got = actual[i]
      if (want !== undefined && got !== undefined && want.replace(/\s+$/, '') === got.replace(/\s+$/, '')) {
        matched++
        continue
      }
      fail(
        `${file}:${anchor}`,
        want === undefined
          ? 'the program prints more than is documented'
          : got === undefined
            ? 'documented output the program never produced'
            : 'documented output does not match what the program prints',
        `line ${i + 1}\n  expected: ${want === undefined ? '(nothing)' : JSON.stringify(want)}\n` +
          `  actual:   ${got === undefined ? '(nothing)' : JSON.stringify(got)}`,
      )
      break
    }
    claims += matched
  }
}

rmSync(work, { recursive: true, force: true })

console.log(
  `${files.length} notes files: ${total} js block(s), ${ran} ran, ${skipped} skipped as fragments, ` +
    `${threw} asserted to throw, ${continued} continued`,
)
console.log(
  `  output lines matched: ${claims}, silent samples: ${unchecked}, ` +
    `bare fences: ${bare}, non-sample blocks: ${nonSample}`,
)

if (failures.length === 0) {
  console.log('no failures')
  process.exit(0)
}

console.error(`\n${failures.length} failure(s):`)
for (const f of failures) {
  console.error(`\n  ${f.where}: ${f.message}`)
  if (f.detail) console.error(f.detail.replace(/^/gm, '    '))
}
process.exit(1)
