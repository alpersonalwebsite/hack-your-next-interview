# Geometry

An easy example of HOW to structure modular functionality, using the module system that is built into node.

## Execute the example

```sh
node calculations.mjs
```

Output:

```
78.53981633974483
```

## Notes

Files using ES modules (`import`/`export`) have the extension `.mjs`, which is what tells node to treat them
as modules rather than as CommonJS scripts. Nothing else is needed: no flag, no dependency, no build step.

**Two things about the import paths are not optional, and this example used to get both wrong.**

Write the file extension. `import formulas from './circle/index.mjs'`, not `'./circle/index'`. CommonJS
`require()` will try `.js`, `.json` and `.node` for you when you leave the extension off; ES modules do not
guess, because the specifier is a URL and a URL means exactly what it says.

Point at the file, not the folder. `'./circle/index.mjs'`, not `'./circle'`. CommonJS treats a directory as
its `index.js`; ES modules have no such rule. Leaving it off gives you:

```
Error [ERR_UNSUPPORTED_DIR_IMPORT]: Directory import '.../circle' is not supported resolving ES modules
```

Both of those were experimental conveniences in node's early module implementation, and the README here used
to document the flag that went with them, `node --experimental-modules calculations`. On a current node that
command fails before it starts, with `Cannot find module`, because the extensionless form it depends on is
gone. Writing the full path has always worked and still does, which makes it the version worth learning.

## A note on named exports, which is now out of date

This page used to say that named exports were "not yet supported", which is why `calculations.mjs` imports a
default and then destructures it:

```javascript
// check: skip an import fragment; the runnable version is calculations.mjs itself
import formulas from './circle/index.mjs'
const { area } = formulas
```

That was true of node's early implementation and it is not true now. This works:

```javascript
// check: skip the form this example could use instead, shown for contrast
import { area } from './circle/index.mjs'
```

The example keeps the default-plus-destructure form so the file still reflects what it was written to
demonstrate, but if you are structuring something today, export what you mean by name.

`circle/formulas/area.js` is deliberately left as CommonJS, `module.exports = area`, and it still imports
cleanly into an `.mjs` file: node hands a CommonJS module's exports over as the default import. Mixing the two
in one project is normal, and this is the direction that works.
