const { performance } = require('perf_hooks');

const startingTime = performance.now();

// Start of code

function fibonacci(num) {
  let results = [];
  if (num == 0) return [0];
  if (num == 1) return [0, 1];

  const arr = fibonacci(num - 1);
  return [...arr, arr[num - 1] + arr[num - 2]];
}

console.log(fibonacci(10));

// End of code

const endingTime = performance.now();
console.log('Function took ' + (endingTime - startingTime) + ' milliseconds.');
