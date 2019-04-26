const esmImport = require('esm')(module);
const { area } = esmImport('./circle').default;

const radius = 5
const circleArea = area(radius)

console.log(circleArea)