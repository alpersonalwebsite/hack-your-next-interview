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

isEven(1); // false
isEven(8); // true
```

Alternatively, you can be asked to check if the number is odd, or, if it is even or odd.

```js
function isEvenOrOdd(num) {
  return (num % 2 === 0 ? 'even' : 'odd');
}

isEvenOrOdd(1); // odd
isEvenOrOdd(8); // even
```

## Check if number is prime

A prime number is a number that has just 2 factors: 1 and the number itself.
*Note:* Remember that the smallest prime number is 2 and the biggest must be less than the number itself.

Examples:
* 4 is not a prime number since it can be divided by 1, 4 but also 2
* 6 is not a primer number since it can be divided by 1, 6 byt also 2 and 3

Given a number as limit, loop one by one checking if the number is prime.

You will start at `2` and check until `one number less than the own number`. So, if you are looking for prime numbers in a limit of 10, you will start with 2 and go up until 9.

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

// *
// **
// ***
// ****
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

Alternatively, you can use `string.repeat(number)`

Instead of this `Array(level + (level - 1) + 1).join('*')` use this `'*'.repeat(level + (level - 1) + 1)`