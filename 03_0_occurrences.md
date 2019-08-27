# Occurrences
Find the `character` that appears more times in a given `string`.

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

We are going to use an `Object` to store each character as the key and the number of occurrences as value.
Then, once we have our "dictionary" we will iterate through each key and compare if the value the key hold is greater than our namespace `occurrences` value which is defaulted to 0.

## Solution: most recurrent number

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
For this case you can parse the input to `string`. Like: `str = str.toString()`

2. What happens if we want to show **JUST** `chars that appear more than once` (aka, just duplicate characters) At the moment, if we provide `abc` as input, the function will return `a`. 
For this case we can replace `return keyInObj;` with `return keyInObjValue  > 1 ? keyInObj : 'No duplicates!';`. 

3. At the moment, for the following input `aabbcc` we are returning `a`. However, we have an equal number of a, b and c. By default, our function is returning the first occurrence of the highest duplicate number. But... What happens if for these cases we want to return an array with all the characters? 

    We can obtain this without having to make big changes in our function.

    First we are going to declare and initialize a new variable: `const multipleKeys = []`
    Then, we are going to add a new conditional: `if (objectAsTable[key] === keyInObjValue) multipleKeys.push(key)`
    In our return, we are going to `return a new Object` with out first occurrence of the duplicate numbers plus, all the elements that we have in our new array. Code: `return keyInObjValue  > 1 ? [keyInObj, ...multipleKeys] : 'No duplicates!';`
    Yes... Now, we are going to return an array even in cases with one element. Example, for input `aabc` our output will be `['a']`
    As an interviewer I will not object that, yet you can make a slight change to return...
    For `abc` >> `No duplicates!`
    For `aabc` >> `a`
    For `aabbc` >> `['a', 'b']`

You can see this "improvement" with the previous one in the following snippet:

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

Similar "challenges"...

Find the  character. Example '185041'

If there´s `only ONE duplicate` character and you can use `sort()`
Outputs:
* false
* duplicate character

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

If we cannot use `sort()`, we should re-utilize the previous data structure: "hash table dictionary". In this case, since we are expecting *just ONE* repetition, as soon as we find the duplicate character we return (we don´t want to keep iterating until the end if we found the occurrence. Remember *performance*).

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

---

We can slightly change the "challenge" to return...
1. All characters without duplicates. For the string `'aabbbcdd'` we should return `'abcd'`
2. Just unique characters. For the string `'aabbbcdd'` we should return `'c'`

## Solution: all characters without duplicates with Set

> The Set object lets you store **unique** values of any type, whether primitive values or object references. [Set - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)


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

However, probably your interviewer will ask you for a solution using a "hash table" and a "loop".

You can re-utilize previous logic.

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

And yes... This approach **does not preserve order** since we are working with an `object`.

## Solution: return unique chars

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
