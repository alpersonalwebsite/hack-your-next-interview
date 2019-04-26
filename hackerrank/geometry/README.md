# Geometry

An easy example of HOW to structure modular functionality.

# Execute the example 
```
node --experimental-modules calculations
```

Default output: `78.53981633974483`

## Notes
Files using `ES modules` (import/export syntax) have the extension `*.mjs` 

The main file, in this case `calculations.mjs` is executed with the proper `flag`: `node --experimental-modules calculations`

Since `named exports` are not yet supported, we first `import` and then `destructure`

```javascript
import formulas from './circle'
const { area } = formulas
```

... instead of ...

```javascript
import { area } from './circle'
```

`area.js` uses the default `Node.js` export: `module.exports = area`