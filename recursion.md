# Recursion

Colloquially, recursion is the process through which a `function calls itself until a base case is reached`.

Some common `test-questions`:

## Fibonacci

Output or log an array with the Fibonacci sequence until `num` (aka, index). More information about [Fibonacci Interview Question](./01_0_fibonacci.md)

### Solution: 

```javascript
function fibonacci(num) {
  let results = [];
  if (num == 0) return [0];
  if (num == 1) return [0, 1];

  const arr = fibonacci(num - 1);
  return [...arr, arr[num - 1] + arr[num - 2]];
}

console.log(fibonacci(10));
```

Result:
```
[0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55]
```

## Factorial


### Solution: 

```

```

Result:
```

```