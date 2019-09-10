# Occurrences

Find the `character` that appears more times (aka, highest frequency) in a given `string`.
It could also be find if an `array` is subset of another `array`.

Example:
For... `'33hhhilm9999'` the output should be `9` since...
```
3: 2
h: 3
i: 1
l: 1
m: 1
9: 4
```

## Solutions summary
1. Occurrences with hash-table and 2 for loops
2. Improved version of Solution 1 for handling inputs and outputs
3. Find duplicate char with .sort()
4. Find duplicate char with hash-table and for...of
5. Find duplicates characters (multiple) with hash-table and 2 for loops and an array
6. Find duplicate with hash-table, for...of and tracking variables
7. No duplicate chars with Set()
8. No duplicate chars with temporal array
9. No duplicate chars with hash-table (order not preserved)
10. Unique characters with hash-table and 2 for loops
11. Find if array is subset of another array
11. Find subset in array with hash-table and 2 for loops canceling keys

---

We are going to use an `Object` to store each character as key and the number of occurrences as value.
Then, once we have our "dictionary" we will iterate through each key and compare if the value the key holds is greater than our namespace `occurrences` value which is defaulted to 0.

## Solution 1: most recurrent number

```javascript
function moreOccurrences(str) {

  const objectAsTable = {};

  for (let char of str) {
    if (objectAsTable[char]) objectAsTable[char]++;
    else objectAsTable[char] = 1;
  }

  let keyInObj
  let keyInObjValue = 0

  for (let key in objectAsTable) {
  
  // Just to help you
  // console.log('Comp', objectAsTable[key], keyInObjValue)

    if (objectAsTable[key] > keyInObjValue) {
      keyInObj = key
      keyInObjValue = objectAsTable[key]
    }
  }

return keyInObj;

}

console.log(moreOccurrences('333hhhilm9999')); // Expected 9
console.log(moreOccurrences('abbaaaaccccc')); // Expect a
console.log(moreOccurrences('abc')); // Expect a
```

## Result:

```
9
a
a
```

We can always improve our functions thinking in the `"ALL" the possible inputs` as "first concern".

Examples:

1. What happens if we receive a `number` instead of a `string`? In the context of an interview or "coding challenge", sometimes you can pre-define boundaries with your counterpart, but, in real life... You do want to cover as many scenarios as you can. 
For this case you can parse the input to `string`. Example: `str = str.toString()`

2. What happens if we want to show **JUST** `chars that appear more than once` (aka, just duplicate characters) Currently, if we provide `abc` as input, the function will return `a`. 
For this case we can replace `return keyInObj;` with `return keyInObjValue  > 1 ? keyInObj : 'No duplicates!';`. 

3. At the moment, for the following input `aabbcc` we are returning `a`. However, we have an `equal number of a, b and c`. By default, our function is returning the first occurrence of the highest duplicate char. But... What happens if for these cases we want to return an array with all the characters? 

    We can obtain this without having to make big changes in our function.

    First we are going to declare and initialize a new variable: `const multipleKeys = []`
    Then, we are going to add a new conditional: `if (objectAsTable[key] === keyInObjValue) multipleKeys.push(key)`

    In our return, we are going to `return a new array` with the first occurrence of the duplicate numbers plus all the elements that we have in our new array. Code: `return keyInObjValue  > 1 ? [keyInObj, ...multipleKeys] : 'No duplicates!';`

    Yes... Now, we are returning an array even in cases of one element. Example, for input `aabc` our output will be `['a']`

    As an interviewer I will not object that, yet, you can make a slight change to return...
    For `abc` >> `No duplicates!`
    For `aabc` >> `a`
    For `aabbc` >> `['a', 'b']`

Here's the code with the improvements:

## Solution 2

```javascript
function moreOccurrences(str) {

  str = str.toString()

  const objectAsTable = {};

  for (let char of str) {
    if (objectAsTable[char]) objectAsTable[char]++;
    else objectAsTable[char] = 1;
  }

  let keyInObj
  let keyInObjValue = 0
  const multipleKeys = []

  for (let key in objectAsTable) {
  
  //console.log('comp', key, objectAsTable[key], keyInObjValue) 
  
    if (objectAsTable[key] === keyInObjValue) multipleKeys.push(key)

    if (objectAsTable[key] > keyInObjValue) {
      keyInObj = key
      keyInObjValue = objectAsTable[key]
    }
  }
  


return keyInObjValue  > 1 ? singleCharOrArray(keyInObj, multipleKeys) : 'No duplicates!';

}


function singleCharOrArray(firstOccurrence, arrayWithKeys) {
  return arrayWithKeys.length === 0 ? firstOccurrence : [firstOccurrence, ...arrayWithKeys]
}


console.log(moreOccurrences('333hhhilm9999')); 
console.log(moreOccurrences('abbaaaaccccc'));
console.log(moreOccurrences('abc'));
console.log(moreOccurrences('aabbc'));
```

Result:
```
9
["a", "c"]
No duplicates!
["a", "b"]
```

---

Let's address some similar challenges.

Find the duplicate character.

If there´s `only ONE duplicate` character and you can use `sort()`
Outputs:
* false
* the duplicate character

## Solution 3

```javascript
function isDuplicate(str) {
  const stringToArray = str.split('').sort();

  for (let i = 1; i < stringToArray.length; i++) {
    if (stringToArray[i] === stringToArray[i - 1]) return stringToArray[i];
  }
  return false;
}

console.log(isDuplicate('18504')); // Expected false
console.log(isDuplicate('185048')); // Expected 8
```

Result:
```
false
8
```

If we cannot use `sort()`, we should re-utilize the previous data structure: "hash table / dictionary". In this case, since we are expecting *just ONE* repetition, as soon as we find the duplicate character we return (we don´t want to keep iterating once the occurrence is found Remember *performance*).

## Solution 4

```javascript
function isDuplicate(str) {
  const objectAsTable = {};

  for (let char of str) {
  
    //console.log(objectAsTable)
  
    if (objectAsTable[char]) return char;
    else objectAsTable[char] = 1;
  }

  return false;
}

console.log(isDuplicate('18049ak8sh')); // Expected 8

```

Result:
```
8
```

If we have multiple char occurrences...

## Solution 5

```javascript
function isDuplicate(str) {
  const objectAsTable = {};

  for (let char of str) {
    if (objectAsTable[char]) objectAsTable[char]++;
    else objectAsTable[char] = 1;
  }

  const occurrences = [];

  for (let key in objectAsTable) {
    if (objectAsTable[key] > 1) occurrences.push(key);
  }

  return occurrences;
}

console.log(isDuplicate('180654321198'));
```

Result:
```
['1', '8']
```

If we want to return the `character` with more occurrences OR, in case of multiple with same frequency, the first one, we can do the following...

## Solution 6

```javascript
function isDuplicate(str) {
  const objectAsTable = {};
  let highestFreq = 0;
  let highestFreqElement = ''

  for (let char of str) {
    
    let tempVal = objectAsTable[char]
  
    if (tempVal) objectAsTable[char]++;
    else objectAsTable[char] = 1;
    
    if (tempVal > highestFreq) {
      highestFreq = tempVal
      highestFreqElement = char
    }
  }

  return highestFreqElement;
}

console.log(isDuplicate('18181890')); // Expected 1
console.log(isDuplicate('1818890')); // Expected 8
```

Result:
```
1
8
```

The general logic is similar to what we have been doing...
We `loop our string`, check if we have that `character as key` in the temporal object (objectAsTable); if we have it, we increase its value, if not, we add it to the object.

Yet, we are introducing 2 new variables and a conditional.

Let's try to make it graphic. Imagine we have the following object:

```
a: 3
b: 1
c: 2
```

The next character we have to check in our object is `d`. We don't have `d`; so we add it and set its value to `1`.

```
a: 3
b: 1
c: 2
d: 1
```

Next character: `a`. We do have `a` in our object. So we increase its value by 1.

```
a: 4
b: 1
c: 2
d: 1
```

But, we also check if the value of `a` is greater than the value of `highestFreq = 3`.
In this case, it is. So we set the value of `highestFreq` to `4` which is the value of `a`.
We also replace the string or character we are holding in the variable `highestFreqElement` which the one it has the greater value. In this case, `highestFreqElement` is going to hold the value `a`

Next character is `b`. We have it so be increase its value by `1`. But, the value of `b` is not greater than the previous "highest frequency character" (in our case, `a`). Nothing else to do here! Just move to the next `character` in the `loop`. 

---

We can slightly change the "challenge" to return...

1. All characters without duplicates. For the string `'aabbbcdd'` we should return `'abcd'`
2. Just unique characters. For the string `'aabbbcdd'` we should return `'c'`

## Solution 7: all characters without duplicates with Set

> The Set object lets you store **unique** values of any type, whether primitive values or object references. [Set - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)

Feel free to replace `[...set]` with `Array.from(set)`

```javascript
function removeDuplicates(str) {
  const set = new Set(str)
  return [...set].join('')
}

console.log(removeDuplicates('aaabbbbbbcd1112666'))
```

## Result:

```
abcd126
```

Optionally, we can create an empty array, check if we have that element in the array, and, if we don't have it, simply add it.

Feel free to replace `(tempArr.indexOf(char) === -1)` with `(!tempArr.includes(char))`.

## Solution 8

```javascript
function removeDuplicates(str) {
  const tempArr = [];
  
  for (let char of str) {
    if (tempArr.indexOf(char) === -1) tempArr.push(char)
  }
  
  return tempArr.join('')

}

console.log(removeDuplicates('aaabbbbbbcd1112666'))
```

Result:
```
abcd126
```

However, probably your interviewer will ask you for a solution using a "hash table" and a "loop".

You can re-utilize previous logic.

## Solution 9

```javascript
function removeDuplicates(str) {
  const objectAsTable = {};
  
  for (let char of str) {
    if (objectAsTable[char]) objectAsTable[char]++
    else objectAsTable[char] = 1
  }
  
  return Object.keys(objectAsTable).join('')
}

console.log(removeDuplicates('aaabbbbbbcd1112666'))
```

Result:
```
126abcd
```

And yes...! This approach **does not preserve order** since we are working with an `object`.

## Solution 10: return unique chars

```javascript
function returnUnqiueChars(str) {
  const objectAsTable = {};
  
  for (let char of str) {
    if (objectAsTable[char]) objectAsTable[char]++
    else objectAsTable[char] = 1
  }
  
  let uniqueChars = '';
  
  for (let key in objectAsTable) {
    if (objectAsTable[key] < 2) uniqueChars += key;
  }

  return uniqueChars;
  
}

console.log(returnUnqiueChars('abbaabbbcd16126661'))
```

## Result:

```
2cd
```

You can re-use the previous functions also for `arrays` just making minor changes.

---

Find if an array is subset of another array.

In this challenge you have to check if the `first array` contains all the elements of the `second array`.

Examples:
* `[1,2,3,4]` and `[1,2]` -> true
* `[1,2,3,4]` and `[1,2,2]` -> false (we have just one 2 in our first array)

*Note:* The `second array` always is going to have at least the same length as the second.

## Solution 11:

```javascript
const arr1 = [1,2,3];
const arr2 = [1,2,3,4];

const arr3 = [1,2,3,4];
const arr4 = [1,2,3,1];

const arr5 = [1,2,3,4];
const arr6 = [1,2,3];

const arr7 = [1,2,3,1,4];
const arr8 = [1,2,3,1];

function isSubset(array1, array2) {
  
  if (array2.length > array1.length) return false
  
  const objectAsTable = {};
  
  for (let elem of array2) {
    if (objectAsTable[elem]) objectAsTable[elem]++;
    else objectAsTable[elem] = 1;
  }
  
  console.log(objectAsTable)
  
  for (let elem of array1) {
    if (objectAsTable[elem]) {
      if (objectAsTable[elem] === 1) delete objectAsTable[elem];
      else objectAsTable[elem]--;
    }
  }
  
  console.log(objectAsTable)
  

  if (Object.keys(objectAsTable).length > 0) return false

  
  return true
}

console.log(isSubset(arr1, arr2)) // expected false
console.log(isSubset(arr3, arr4)) // expected false 
console.log(isSubset(arr5, arr6)) // expected true
console.log(isSubset(arr7, arr8)) // expected true
```

## Result:

```
false

{1: 2, 2: 1, 3: 1}
{1: 1}
false

{1: 1, 2: 1, 3: 1}
{}
true

{1: 2, 2: 1, 3: 1}
{}
true
```