# Fibonacci

Output or log an array with the Fibonacci sequence until `num` (aka, index)

## Solution 1: loop - O(n) or linear

```JavaScript
function fibonacci(num) {
  const result = [0,1];
  for (let i = 2; i <= num; i++) {
    const oneLeft = result[i - 1];
    const twoLeft = result[i - 2];

    result.push(oneLeft + twoLeft);
  }
  return result;
}

console.log(fibonacci(10))
```

## Result:

Time may vary in relation to the processes running on your machine.

```
[ 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55 ]
Function took 2.880434989929199 milliseconds.
```

---

## Solution 2: recursive - exponential

```JavaScript
function fibonacci(num) {
  let results = [];
  if (num == 0) return [0];
  if (num == 1) return [0, 1];

  const arr = fibonacci(num - 1);
  return [...arr, arr[num - 1] + arr[num - 2] ]
}

console.log(fibonacci(10))
```

## Result:

Time may vary in relation to the processes running on your machine.

```
[ 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55 ]
Function took 2.9242050647735596 milliseconds.
```

---

Alternatively, if you want to return the `last index` (or num) instead of the entire array until `num`

## Solution

```javascript
function fibonacci(num) {
  if (num < 2) {
    return num;
  }

  return fibonacci(num - 1) + fibonacci(num - 2);
}

console.log(fibonacci(10));
```

## Result:

Time may vary in relation to the processes running on your machine.

```
55
Function took 2.6425609588623047 milliseconds.
```
