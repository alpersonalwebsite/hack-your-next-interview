# Reversing: strings or arrays

TO DO: Description or intro...

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
