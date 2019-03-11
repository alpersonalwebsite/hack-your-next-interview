# Reversing: strings numbers or arrays
Examples:
* String > Hello should return olleH
* Number > -10 should return -1
* Array > [1,2,3] should return [3,2,1]

## Solution 1
Since we are going to reverse using the `reverse()` array method we need first to convert our string into an array.
Then, use the method, convert back into a string and return. Straightforward!

Example:
```javascript
const str = "I'm a string";

const reverse1 = (str) => {
  return str.split('').reverse().join('');
}

console.log(reverse1(str))
```

Result:
```
gnirts a m'I
```

## Solution 2
The previous example is probably what you would do in a real non-interview context.
However, your interviewer could want a "looping solution". This and the next 2 examples, are going to be based on iterations.
For this one, we are also converting into an array, then going through each element with `map()` and adding each element to the start of the array with `unshift()`. Then, we `join()` the string and return it.

Example:
```javascript
const reverse2 = (str) => {
  let results = [];
  const strToArry = str.split('');
  strToArry.map((element) => {
    results.unshift(element);
  })

  return results.join('');
}

console.log(reverse2(str))
```

Result:
```
gnirts a m'I
```

## Solution 3
Before, we were converting (casting?) our string input into an array. Totally valid! But, we can avoid that steep and loop each element of the string adding it to the start of a new namespace that would be the return of our function.
This is the conventional for loop solution approach.

Example:
```javascript
const reverse3 = (str) => {
  let results = '';
  for(let i = 0; i < str.length; i++) {
    results = str[i] + results;
  }
  return results;
}

console.log(reverse3(str))
```

Result:
```
gnirts a m'I
```

## Solution 4
This is similar to the previous example, but using the elegant syntax of `for...of`.
If you don´t need to move "your pointer" several indexes (for example i + 2) on each iteration, this should be the preferred solution.

Example:
```javascript
const reverse4 = (str) => {
  let results = '';
  for(char of str) {
    results = char + results;
  }
  return results;
}

console.log(reverse4(str))
```

Result:
```
gnirts a m'I
```

## Solution 5
For reversing a number, we can cast that number into a string and use some of the previous solutions.
Then, convert back into number and multiply the result by its sign with `Math.sign(originalNumber)` to preserve the `-` (negative).

Example:
```javascript
const reverse5 = (num) => {
  let converted = num.toString();
  let results = '';
  for(char of converted) {
    results = char + results;
  }
  return parseInt(results) * Math.sign(num);
}

console.log(reverse5(-10))
```

Result:
```
-1
```
