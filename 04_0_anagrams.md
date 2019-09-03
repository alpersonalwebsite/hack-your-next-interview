# Anagrams

> An anagram is a word or phrase formed by rearranging the letters of a different word or phrase,typically using all the original letters exactly once.[1] For example, the word anagram can be rearranged into nag a ram, or the word binary into brainy or the word adobe into abode. Source: [Wikipedia - Anagram](https://en.wikipedia.org/wiki/Anagram)

We need to determine if `2 strings` are `anagrams`, ensuring that...
* We only consider characters in the range of `a to z` (others can be removed or avoided)
* We work with lowercase chars
* We return boolean: `true` or `false`

## Solution 1: Compare strings (string to array to string)

```javascript
const str1 = 'Hel1@ olA';
const str2 = ' H e ll0o';

function parseStringToAZ(str) {
  return str.replace(/[^a-z]/gi,'').toLowerCase();
}

function isAnagram(strA, strB) {
  strA = parseStringToAZ(strA).split('').sort().join('')
  strB = parseStringToAZ(strB).split('').sort().join('')
  
  return (strA === strB) ? true : false
}


console.log(isAnagram(str1, str2))
```

Result:
`false`

## Solution 2: Compare strings (object to string)

```javascript
const str1 = 'Hel1@ ol';
const str2 = ' H e ll0o';

function parseStringToAZ(str) {
  return str.replace(/[^a-z]/gi,'').toLowerCase();
}

function mapToObject(str) {
  str = parseStringToAZ(str)
  
  const objectAsTable = {};
  
  for (let char of str) {
    (objectAsTable[char]) ? objectAsTable[char]++ : objectAsTable[char] = 1
  }
  
  return objectAsTable
}

function isAnagram(strA, strB) {

  strA = parseStringToAZ(strA)
  strB = parseStringToAZ(strB)

  // Should have same length
  if (strA.length !== strB.length) return false

  let obj1 = mapToObject(strA)
  let obj2 = mapToObject(strB)
  
  // Convert to string and compare
  console.log(JSON.stringify(obj1))
  console.log(JSON.stringify(obj2))
  
  if (JSON.stringify(obj1) === JSON.stringify(obj2)) return true
  
  
  return false
}


console.log(isAnagram(str1, str2))
```

Result:
```
{"h":1,"e":1,"l":2,"o":1}
{"h":1,"e":1,"l":2,"o":1}
true
```

## Solution 3: Check object property (Loop: if present subtract 1, if not return false)

```javascript
const str1 = 'Hel1@ ol';
const str2 = ' H e ll0o';

function parseStringToAZ(str) {
  return str.replace(/[^a-z]/gi,'').toLowerCase();
}

function mapToObject(str) {
  str = parseStringToAZ(str)
  
  const objectAsTable = {};
  
  for (let char of str) {
    (objectAsTable[char]) ? objectAsTable[char]++ : objectAsTable[char] = 1
  }
  
  return objectAsTable
}

function isAnagram(strA, strB) {

  strA = parseStringToAZ(strA)
  strB = parseStringToAZ(strB)

  // Should have same length
  if (strA.length !== strB.length) return false

  let obj1 = mapToObject(strA)
 
  for (let char of strB) {
    // if we dont have that character in our previous object
    // it is not an anagram
    if (!obj1[char]) {
      return false
    } else {
      obj1[char]--
    }
  } 
  console.log(obj1)
  return true

}


console.log(isAnagram(str1, str2))
```

Result:
```
{h: 0, e: 0, l: 0, o: 0}
true
```