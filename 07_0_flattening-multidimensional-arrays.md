# Flattening multidimensional Arrays

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



## Solution 1: recursion

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