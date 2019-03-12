# Occurrences
Find the character that appears more times in a given string (aka, maximum occurring character).
Example:
For... '33hhhilm9999' the output should be 9 since...
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

## Solution:

```javascript
function moreOccurrences(str) {
  const objectAsTable = {};

  for (let char of str) {
    if (objectAsTable[char]) objectAsTable[char]++;
    else objectAsTable[char] = 1;
  }

  let occurrences = 0;

  for (let key in objectAsTable) {
    if (objectAsTable[key] > occurrences) {
      occurrences = key;
    }
  }

return occurrences;

}

console.log(moreOccurrences('33hhhilm9999'));
```

## Result:

```
9
```

Similar "challenges"...

Find the duplicated character. Example '185041'

If  there´s `only ONE duplicated` character and you can use `sort()`

```javascript
function isDuplicated(str) {
  const stringToArray = str.split('').sort();

  for (let i = 1; i < stringToArray.length; i++) {
    if (stringToArray[i] === stringToArray[i - 1]) return stringToArray[i];
  }
  return false;
}

console.log(isDuplicated('18504'));
```

If we cannot use `sort()` we can re-utilize the previous logic: "dictionary". In this case, since we are just expecting ONE repetition, as soon as we find the duplicated character we return (we don´t want to keep iterating until the end if we found the occurrence. Remember: *performance*).

```javascript
function isDuplicated(str) {
  const objectAsTable = {};

  for (let char of str) {
    if (objectAsTable[char]) return char;
    else objectAsTable[char] = 1;
  }

  return false;
}

console.log(isDuplicated('18048'));
```

If we have multiple char occurrences...
```javascript
function isDuplicated(str) {
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

console.log(isDuplicated('180654321198'));
```
