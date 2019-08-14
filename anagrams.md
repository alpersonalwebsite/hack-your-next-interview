# Anagrams

> An anagram is a word or phrase formed by rearranging the letters of a different word or phrase,typically using all the original letters exactly once.[1] For example, the word anagram can be rearranged into nag a ram, or the word binary into brainy or the word adobe into abode. Source: [Wikipedia - Anagram](https://en.wikipedia.org/wiki/Anagram)

We need to determine if `2 strings` are `anagrams`, ensuring that...
* We only consider characters in the range of `a to z` (others can be removed or avoided)
* We work with lowercase chars
* We return boolean: `true` or `false`

Solution 1:

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


