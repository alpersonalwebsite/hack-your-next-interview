# Palindromes

Palindrome: a word, phrase, number, or other sequence of symbols or elements, whose meaning may be interpreted the same way in either forward or reverse direction.
For more information: [Palindrome List](http://www.palindromelist.net/)

In our case, we need to reverse the string (for this example, the input will always be a string) using some of the functions (or approaches) that we created previously for [reversing without reverse() method](./00_1_useful-methods-reversing.md) and return `true` or `false`.

*Notes:*
`znnz` should return `true`
`Amore, Roma.` (which reversed is `.amoR ,eromA`) should also return `true`; for this, be sure that you are...
* Converting to `lowercase`
* Replacing everything that is not a letter from `a-z` or a number from `0-9`

## Solution:

```javascript
function palinDrome(str) {
  let result = '';
  for (char of str) {
    result = char + result;
  }
  return prepareString(result) === prepareString(str)
}

function prepareString(str) {
  return str.toLowerCase().replace(/[^a-z0-9]/g, '');
}

console.log(palinDrome('Amore, Roma.'));
```

## Result:

```
true
```

---

# Rotation

This is not a common Interview question, however, it's a regular challenge in platforms like `hackerrank`

We have 2 `strings` and we have to check if one is the rotation of the other.

Examples:
`abcd` and `cdab` should return `true`
`abcd` and `dcab` should return `false`

First, both strings must have the same length. If not, we should immediately return `false`.

The solution is much simpler than you might be thinking. Just duplicate the string and search for that substring.

`abcdabcd` has the substring `cdab`...? Yes...
`abcdabcd` has the substring `dcab`...? No...

## Solution:

```javascript
const str1 = 'abcd';

const str2 = 'cdab';

const str3 = 'dcab';

const str4 = 'dca';

function isRotation(firstStr, secondStr) {
  if (firstStr.length !== secondStr.length) return false;
  
  if (firstStr.repeat(2).includes(secondStr)) return true
  
  return false
}

console.log(isRotation(str1, str2))
console.log(isRotation(str1, str3))
console.log(isRotation(str1, str4))
```

## Result:
```
true
false
false
```