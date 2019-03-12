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

## Solution:

```javascript
function moreOccurrences(str) {
  const objectAsTable = {};

  for (let char of str) {
    if (objectAsTable[char]) objectAsTable[char]++;
    else objectAsTable[char] = 1;
  }

  let occurences = '';

  for (let val in objectAsTable) {
    if (objectAsTable[val] > occurences) {
      occurences = val;
    }
  }

return occurences;

}

console.log(moreOccurrences('33hhhilm9999'));
```

## Result:

```
9
```
