# Geometry

An easy example of HOW to structure modular functionality.

# Installation
```
yarn install
```

# Execute the example 
```
node calculations
```

Default output: `78.53981633974483`

## Notes
Having installed the package `esm`, we just add at the top of our root file, in this case `calculations.js`:

```javascript
const esmImport = require('esm')(module);
const { area } = esmImport('./circle').default;
```
Then, we can use in all our files the `*.js` extension and `ES Modules` import/export syntax.
