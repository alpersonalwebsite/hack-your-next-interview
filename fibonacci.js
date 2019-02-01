const { performance } = require('perf_hooks');

const startingTime = performance.now();

// Start of code

function fibonacci(num) {
  const result = [0, 1];
  for (let i = 2; i <= num; i++) {
    const oneLeft = result[i - 1];
    const twoLeft = result[i - 2];

    result.push(oneLeft + twoLeft);
  }
  return result;
}

console.log(fibonacci(10));

// End of code

const endingTime = performance.now();
console.log('Function took ' + (endingTime - startingTime) + ' milliseconds.');
