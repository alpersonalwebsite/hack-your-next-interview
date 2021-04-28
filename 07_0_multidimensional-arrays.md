# Multidimensional Arrays

## Flattening Multidimensional Arrays

Another common challenge is to `flatten multidimensional arrays`.
So, for the input `[1, [2, [3 , [4]], [5]], 6]` we should receive the output `[1, 2, 3, 4, 5, 6]`

The key is we don't know the `depth` of our array of arrays.

If you are thinking of using `.flat(Infinity)`, even when it will work, probably your interviewer will not accept it as a valid answer.

Example:
```javascript
const arr = [1, [2, [3 , [4]], [5]], 6]

console.log(arr.flat(Infinity))
```

Result: `[1, 2, 3, 4, 5, 6]`



## Solution: recursion

```javascript
function flatten(nestedArr) {
  const tempArr = [];
  
  
  (function flat(arr) {
    console.log('flat > nestedArr is', JSON.stringify(arr))
    arr.map((el) => {
      if (Array.isArray(el)) flat(el);
      else tempArr.push(el);
    });
  })(nestedArr);
  

  console.log('flatten > nestedArr is', JSON.stringify(nestedArr))
  
  return tempArr
}


const arr = [1, [2, [3 , [4]], [5]], 6]

console.log(flatten(arr))
```

## Result:
```
flat > nestedArr is [1,[2,[3,[4]],[5]],6]
flat > nestedArr is [2,[3,[4]],[5]]
flat > nestedArr is [3,[4]]
flat > nestedArr is [4]
flat > nestedArr is [5]
flatten > nestedArr is [1,[2,[3,[4]],[5]],6]

[1, 2, 3, 4, 5, 6]
```

---

## Sum

We have to `SUM` all the element in an array.

For an array with no sub-arrays: `[1, 2, 3]` the output should be `6`

For an array with sub-arrays, for each sub-array we `SUM` and `MULTIPLY` by its depth 
So, for `[1, [2, 3, [4, 5]]` this would be the logic...

```
1
[2, 3, [4, 5]]
  2
  3
  [4, 5]
    4
    5
```

Or, with `levels`

```
Level 1...
1
[2, 3, [4, 5]]

  Level 2...
  2
  3
  [4, 5]

    Level 3...
    4
    5
```

## Solution:

* Time complexity: O(n)
(n is the total number of elements in the array plus number of sub-arrays, if we have 4 elements and 2 sub-arrays, n will be 6)
* Space complexity: O(d)
(d is the greatest depth of the sub-arrays)

```js
function mdArraySum(array, multiplier = 1) {
  let sum = 0
  for (let element of array) {
    if (Array.isArray(element)) sum += mdArraySum(element, multiplier + 1)
    else sum += element
  }
  return sum * multiplier
}

mdArraySum([1, [3,6], [-1, [-8, 1], 8]])
// -9
```
