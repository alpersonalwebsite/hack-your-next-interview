# Reversing: strings, numbers or arrays

Examples:
* String > `Hello` should return `olleH`
* Number > `-10` should return `-1`
* Array > `[1,2,3]` should return `[3,2,1]`

## Solutions summary

1. Reverse string using reverse()
2. Reverse string with .map() and .unshift()
3. Reverse string with for loop prepending each element to a new string
4. Reverse string with for...of prepending each element to a new string
5. Reverse number and preserve the sign (if negative)
6. Reverse array with for...of and spread operator

## Solution 1

Since we are going to reverse using the `.reverse()` array method, we need first to convert our string to array.
Then, use the method, convert back the array to a string and return it.

Example:
```javascript
const str1 = "I'm a string";

const reverseString = (str) => {
  return str.split('').reverse().join('');
}

console.log(reverseString(str1))
```

Result:
```
gnirts a m'I
```

## Solution 2

The previous example is probably what you would do in a real non-interview context.
However, your interviewer could want a "more engaged" solution.  The following 3 examples are going to be based on iterations.

Example:
```javascript
const str1 = "I'm a string";

const reverseString = (str) => {
  let results = [];
  const strToArry = str.split('');
  strToArry.map((element) => {
    results.unshift(element);
  })

  return results.join('');
}

console.log(reverseString(str1))
```

Result:
```
gnirts a m'I
```

Here, we are also converting the string to array. Then, we `.map()` or loop through each element adding each to the start of the array with `unshift()`. Then, we `join()` the string and return it.

## Solution 3

Before, we were converting our string input to array.
We can avoid that extra steep and loop through each element of the string adding it to the start of a temporal new variable and return it.

This is the conventional for loop solution approach.

Example:
```javascript
const str1 = "I'm a string";

const reverseString = (str) => {
  let results = '';
  for(let i = 0; i < str.length; i++) {
    results = str[i] + results;
  }
  return results;
}

console.log(reverseString(str1))
```

Result:
```
gnirts a m'I
```

## Solution 4

This is similar to the previous example, but using the elegant syntax of `for...of`.
If you don´t need to move "your pointer" several indexes (for example i + 2) on each iteration, this should be the preferred solution to prevent typos.

Example:
```javascript
const str1 = "I'm a string";

const reverseString = (str) => {
  let results = '';
  for(char of str) {
    results = char + results;
  }
  return results;
}

console.log(reverseString(str1))
```

Result:
```
gnirts a m'I
```

## Solution 5

For reversing a number, we can convert that number to a string and re-use some of the previous logic.
Then, convert back to number and multiply the result by its sign with `Math.sign(originalNumber)` to preserve the `-` (if negative).

Example:
```javascript
const reverseNumber = (num) => {
  let converted = num.toString();
  let results = '';
  for(char of converted) {
    results = char + results;
  }
  return parseInt(results) * Math.sign(num);
}

console.log(reverseNumber(-10))
console.log(reverseNumber(-125))
console.log(reverseNumber(310))
```

Result:
```
-1
-521
13
```

## Solution 6

As before, we loop the array. The only difference is we are using the "spread operator" creating a new array where first we add the element, and then spread the value of `tempArr`.

Graphic explanation.
The first time we iterate, `tempArr` is empty and `el` is `1`. So we add 1 at the start of the array and spread nothing. Result: `[1]`.

Now, `tempArr` is `[1]` and `el` is `2`. We replicate the same process with the following result: `tempArr` holds `[2, 1]` 

Example
```javascript
const arr1 = [1,2,3,4,5,6]

const reverseArray = (arr) => {
  let tempArr = []
  
  for (let el of arr) {
    tempArr = [el, ...tempArr]
  }
  
  return tempArr
}

console.log(reverseArray(arr1))
```

Result:
```
[6, 5, 4, 3, 2, 1]
```
