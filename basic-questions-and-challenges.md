# Basic questions and challenges

## Swapping variables

Given 2 variables you have to swap their values using a third variable.

```js
let org1 = 1;
let org2 = 2;

console.log(org1, org2); // 1 2

let temp = org1;
org1 = org2;
org2 = temp;

console.log(org1, org2); // 2 1
```

## Check if a number is even

```js
function isEven(num) {
  return (num % 2 === 0);
}

console.log(isEven(1)); // false
console.log(isEven(8)); // true
```

Alternatively, you can be asked to check if the number is odd, or, if it is even or odd.

```js
function isEvenOrOdd(num) {
  return (num % 2 === 0 ? 'even' : 'odd');
}

console.log(isEvenOrOdd(1)); // odd
console.log(isEvenOrOdd(8)); // even
```

## Check if number is prime

A prime number is a number that has just 2 factors: 1 and the number itself.
*Note:* Remember that the smallest prime number is 2 and the biggest must be less than the number itself.

Examples:
* 4 is not a prime number since it can be divided by 1, 4 but also 2
* 6 is not a prime number since it can be divided by 1 and 6, but also 2 and 3

Given a number as limit, loop one by one checking if the number is prime.

You will start at `2` and check every candidate up to and including the limit, and for each one you test
divisors from 2 up to one less than the candidate. So with a limit of 10 you test 2 through 10, and 10 itself
is checked and rejected.

```js
function printPrimes(limit) {
  for (let currentNumber = 2; currentNumber <= limit; currentNumber++) {

    let isPrime = true;
    for (let factor = 2; factor < currentNumber; factor++) {
      if (currentNumber % factor === 0) {
        isPrime = false;
        break;
      }
    }
    if (isPrime) console.log(currentNumber);
  }
}

printPrimes(10);
// 2
// 3
// 5
// 7
```

## Create a staircase

Given a number as limit, print a staircase from 1 to number.

Example:
If the limit is 4 the staircase should look like:

```
*
**
***
****
```

```js
function drawStaircase(limit) {
  let staircase = '';
  for (let stair = 1; stair <= limit; stair++) {
    staircase += '*';
    console.log(staircase);
  }
}

drawStaircase(4);
```

Result:

```
*
**
***
****
```

## Create a XMAS Tree

Given a number as limit, print an even XMAS tree.

```js
function drawXmasTree(limit) {

  for (let level = 1; level <= limit; level++) {
    const spacing = Array(limit - level + 1).join(' ');
    const tree = spacing + ((level === 1) ? '*' : Array(level + (level - 1) + 1).join('*')); 
    console.log(tree);
  }
}

drawXmasTree (7);
```

Result:

```
      *
     ***
    *****
   *******
  *********
 ***********
*************
```

Alternatively, you can use `string.repeat(number)`, but watch the arithmetic, because the two are off by one
from each other.

`Array(n).join('*')` puts a separator BETWEEN n empty slots, so it gives you **n - 1** stars.
`'*'.repeat(n)` gives you **n**. Swapping one for the other without adjusting the count adds a star per level
and the tree stops being a tree. Measured on `drawXmasTree(4)`:

| level | `Array(n).join('*')` | `'*'.repeat(n)`, same n |
| --- | --- | --- |
| 1 | 1 star | 1 star |
| 2 | 3 stars | 4 stars |
| 3 | 5 stars | 6 stars |
| 4 | 7 stars | 8 stars |

So the replacement is `'*'.repeat(level + (level - 1))`, dropping the `+ 1` that `Array().join()` needed:

```javascript
function drawXmasTree(limit) {
  for (let level = 1; level <= limit; level++) {
    const spacing = ' '.repeat(limit - level);
    console.log(spacing + '*'.repeat(level + (level - 1)));
  }
}

drawXmasTree(4);
```

Result:

```
   *
  ***
 *****
*******
```

`Array(limit - level + 1).join(' ')` becomes `' '.repeat(limit - level)` for exactly the same reason. Both
forms are fine; mixing their arithmetic is not.