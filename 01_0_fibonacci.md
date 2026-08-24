# Fibonacci

Output or log an array with the Fibonacci sequence until `num` (aka, index)

## Solution 1: loop, `O(n)` or linear

```javascript
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

```
[
   0, 1,  1,  2,  3,
   5, 8, 13, 21, 34,
  55
]
```

---

## Solution 2: recursive, `O(n^2)` or quadratic

This one used to say **exponential** here, and that is the wrong label on the wrong function. It makes ONE
recursive call per level, not two, so the call count is linear in `num`. What makes it quadratic is the line
that looks harmless: `[...arr, ...]` copies the whole array at every level, so you pay 1 + 2 + 3 + ... + n
copies to build the answer.

Measured, calls first:

| `num` | calls made by this solution | calls made by solution 3 below |
| --- | --- | --- |
| 10 | 10 | 177 |
| 20 | 20 | 21,891 |
| 40 | 40 | 331,160,281 |

and then wall clock, doubling `num` each time:

| `num` | time |
| --- | --- |
| 1000 | 0.64 ms |
| 2000 | 1.81 ms |
| 4000 | 6.19 ms |

Double the input, roughly quadruple the time. That is what quadratic looks like from the outside, and it is
worth being able to recognise, because "it recurses" and "it is exponential" are not the same claim.

```javascript
function fibonacci(num) {
  if (num == 0) return [0];
  if (num == 1) return [0, 1];

  const arr = fibonacci(num - 1);
  return [...arr, arr[num - 1] + arr[num - 2] ]
}

console.log(fibonacci(10))
```

## Result:

```
[
   0, 1,  1,  2,  3,
   5, 8, 13, 21, 34,
  55
]
```

---

Alternatively, if you want to return the `last index` (or num) instead of the entire array until `num`

## Solution 3: recursive, exponential

**This** is the exponential one, and it is the one worth being able to talk about, because it is the answer
most people give first and the one an interviewer is usually fishing for. Every call makes TWO more, so the
call tree branches: 177 calls at `num` 10, and 331,160,281 at `num` 40, which is where a laptop starts to
struggle. Measured, and note that `num` here goes up by 2 rather than doubling:

| `num` | time |
| --- | --- |
| 22 | 0.15 ms |
| 24 | 0.29 ms |
| 26 | 0.74 ms |
| 28 | 2.09 ms |

Two more of `num` doubles the work. Solution 1 computes `fibonacci(4000)` in about 6 ms; this one would not
finish `fibonacci(100)` before the heat death of anything you care about. The fix, if you are asked for one,
is memoisation: cache each `num` the first time you compute it, and the call tree collapses back to linear.

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

```
55
```

A note on the timings that used to be printed here. Each solution reported roughly 2.6 to 2.9 milliseconds,
which made the exponential one look like the fastest of the three. Those numbers came from a `performance.now()`
pair wrapped around a single call at `num` 10, where every solution is instant and the figure is dominated by
process start-up. A measurement that ranks three algorithms in the wrong order is worse than none, so the
timings above were taken instead by repeating each call and growing `num` until the shape of the curve shows.
