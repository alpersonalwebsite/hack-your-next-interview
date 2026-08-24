# Geometry, the 2019 way

The same example as [geometry](../geometry/README.md), built the way you had to build it before node's own
module support was usable: with the [`esm`](https://www.npmjs.com/package/esm) loader package, so that
`import`/`export` syntax works in plain `.js` files.

**It no longer runs, and that is why it is still here.** Following the instructions below on a current node
exits 1 from inside `node_modules/esm/esm.js` and never prints the expected value. The package works by
patching node's module loader, which is exactly the kind of thing that stops working when the loader changes
underneath it: `esm` was last published in 2020, its `engines` field still says `node >= 6`, and nothing has
maintained it since.

So read this page as a record of how the problem was solved at the time, and use
[geometry](../geometry/README.md) for how to solve it now. The dependency is pinned as it was rather than
upgraded, because there is nothing to upgrade to.

## Installation

```sh
yarn install
```

## Execute the example

```sh
node calculations
```

Expected output, and what you would have seen in 2019:

```
78.53981633974483
```

## Notes

Having installed the `esm` package, you add this at the top of the root file, in this case `calculations.js`:

```javascript
// check: skip an excerpt of calculations.js; needs the esm package installed
const esmImport = require('esm')(module);
const { area } = esmImport('./circle').default;
```

From there every other file can use the `.js` extension with ES module `import`/`export` syntax, which was
the whole appeal: one syntax across a project, years before node could do it without help.

Two details worth noticing, because they are the seams where this approach shows:

* The entry point is still CommonJS. `require('esm')(module)` has to run before anything can be imported the
  new way, so the top of your program is written in the old style regardless.
* `.default` at the end of `esmImport('./circle')` is the interop boundary. You are reaching into an ES
  module's namespace object from CommonJS, and the default export does not unwrap itself.

Compare that with `geometry/`, where the only ceremony is naming the file `.mjs` and writing the full path.
