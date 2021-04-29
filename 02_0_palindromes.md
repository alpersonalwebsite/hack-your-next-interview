# Palindromes

Palindrome: a word, phrase, number, or other sequence of symbols or elements, whose meaning may be interpreted the same way in either forward or reverse direction.
For more information: [Palindrome List](http://www.palindromelist.net/)

In our case, we need to reverse the string (for this example, the input will always be a string) using some of the functions (or approaches) that we created previously for [reversing without reverse() method](./00_1_useful-methods-reversing.md) and return `true` or `false`.

*Notes:*
`znnz` should return `true`
`Amore, Roma.` (which reversed is `.amoR ,eromA`) should also return `true`; for this, be sure that you are...
* Converting to `lowercase`
* Replacing everything that is not a letter from `a-z` or a number from `0-9`

## Solution 1: with a new string

* Time complexity: O(n^2)
Because we are doing string concatenations which creates new strings.

* Space complexity: O(n)
N is the length of the input string, in our example, `str`

```js
function isPalindrome(str) {
  let reversedStr = ''
  for (let i = str.length - 1; i >= 0; i-- ) {
    reversedStr += str[i]
  }
  return reversedStr === str
}

isPalindrome('abcdcba')
// true

isPalindrome('abc')
// false
```

### Solution 2: using an array

* Time complexity: O(n) 
* Space complexity: O(n)

```js
function isPalindrome(str) {
  let reversedStrArray = []
  for (let i = str.length - 1; i >= 0; i-- ) {
    reversedStrArray.push(str[i])
  }
  return reversedStrArray.join('') === str
}

isPalindrome('abcdcba')
// true

isPalindrome('abc')
// false
```

### Solution 3: recursion

* Time complexity: O(n) 
* Space complexity: O(n) 

*Note*: I'm adding the log statement so you can "easily see" what's going on every time we recurse.

```js
function isPalindrome(str, index = 0) {
  // We want to compare the first and last letters
  j = (str.length - 1) - index
  console.log(str[index], str[j])
  
  if (index >= j) return true
  else return str[index] === str[j] && isPalindrome(str, index + 1)
}

isPalindrome('abcdcba')
// 'a' 'a'
// 'b' 'b'
// 'c' 'c'
// 'd' 'd'
// true

isPalindrome('abc')
// 'a' 'c'
// false
```

**This is the tail recursion solution**
Depends on the language's compiler

```js
function isPalindrome(str, index = 0) {
  // We want to compare the first and last letters
  j = (str.length - 1) - index
  console.log(str[index], str[j])
  
  if (index >= j) return true
  if (str[index] != str[j]) return false
  return isPalindrome(str, index + 1)
}

isPalindrome('abcdcba')
// true

isPalindrome('abc')
// false
```

### Solution 4: with pointers
Preferred one. 

* Time complexity: O(n) 
* Space complexity: O(1) 
We are just storing our pointers 


```js
function isPalindrome(str, index = 0) {
  // We want to compare the first and last letters
  leftPointer = 0
  rightPointer = str.length - 1
  
  while(leftPointer < rightPointer) {
    if (str[leftPointer] !== str[rightPointer]) return false
    leftPointer += 1
    rightPointer -= 1
  }
  return true
}

isPalindrome('abcdcba')
// true

isPalindrome('abc')
// false
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