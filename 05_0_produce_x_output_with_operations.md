# Produce "X" output through basic mathematical operations

We have an `array` and we want to find `2 numbers` which through `addition, subtraction, multiplication or division` produces `x` result (aka, number).

Examples:
* `[4,1,3,6]` and we want to `add to 7`

   * **First combination** of 2 numbers respecting order `4,3`: 
     - Retrieving the numbers: `4,3`
     - Retrieving the indexes of those numbers in the array: `0,2`
   * **All combinations** of 2 numbers: `4,3` and `1,6` 

Sometimes, the request can include **sorting**. Remember to check our [Sorting Section](./00_1_useful-methods-sorting.md). This could be particularly useful, if the interviewer allows it, to speed your program: 

Also, you could receive a `string` of numbers and have to produce -first- an `array`. 
*Important*: this will work just with *single digits*.

```js
'347932'.split('')
```

Output:
```
["3", "4", "7", "9", "3", "2"]
```

## Find the pair of numbers which add up to a particular result

### Solution 1: nested for loops
*Constraint*: preserve order and traverse from left to right.

* Time complexity: O(n^2) or quadratic 
* Space complexity: O(1) or constant

```js
function addUp(arr, target) {

  const result = []
  
	for (let i = 0; i < arr.length; i++) {
		for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] + arr[j] === target) result.push([arr[i], arr[j]])
		}
	}
	
	return result
}

addUp([], 5)
addUp([1], 5)
addUp([1,2,6,8], 5)
addUp([1,2,4,3], 5)
```

Output:

```
[]
[]
[]
[ [ 1, 4 ], [ 2, 3 ] ]
```

### Solution 2: Sorting and using pointers

* Time complexity: O(nlogn) or logarithmic
* Space complexity: O(1) or constant

```js
function addUp(arr, target) {

  const result = []

  const newArr = [...arr].sort((a, b) => a - b)

  let leftPointer = 0
  let rightPointer = newArr.length - 1

  // while pointers are not overlapping
  while (leftPointer < rightPointer) {
    const sum = newArr[leftPointer] + newArr[rightPointer] 
    
    if (sum === target) {
      result.push([newArr[leftPointer], newArr[rightPointer]])
      leftPointer++
    } else if (sum < target) {
      leftPointer++
    } else if (sum > target) {
      rightPointer--
    }
  }

	return result
}

addUp([], 5)
addUp([1], 5)
addUp([1,2,6,8], 5)
addUp([1,2,4,3], 5)

// Extra tests
addUp([1,2,4,3,1,5], 5)
addUp([1,2,4,3,6,1,8,10,9], 10)
```

Output:

```
[]
[]
[]
[ [ 1, 4 ], [ 2, 3 ] ]
[ [ 1, 4 ], [ 1, 4 ], [ 2, 3 ] ]
[ [ 1, 9 ], [ 1, 9 ], [ 2, 8 ], [ 4, 6 ] ]
```

---

Now, let's address the case with an `ordered array`.

First, we are going to `sort` our array. Check [Sorting Section](./00_1_useful-methods-sorting.md) for more information.

I'm picking (as before) the simplest way: `.sort()`. However, remember that in the context of an interview, if you have to `sort or order an array`, your interviewer -probably- will not take the built-in array method `.sort()` as a valid approach. 

```javascript
const arr1 = [4,1,3,6];

const orderedArr1 = [...arr1].sort()


console.log(orderedArr1)
console.log(arr1)
```

Result:
```
[1, 3, 4, 6]
[4, 1, 3, 6]
```

**IMPORTANT:** We are going to see `Data Immutability` in other section, but, until then, keep in mind...

1. It is a good functional pattern to preserve the original data (aka, not modify the original array. That's why, in our case, we are `spreading` ALL the elements of the `original array` into a `new array [...arr]`).

2. Arrays are assigned by reference (not value like string, numbers). So if we try to assign `arr1` as the value of `orderedArr1` what we are doing is setting a pointer (or reference) to `arr1`, so, if we modify `orderedArr1`, under the hood, we are modifying the original array, `arr1`.

Example: 

```javascript
const arr1 = [4,1,3,6];

const orderedArr1 = arr1.sort()


console.log(orderedArr1)
console.log(arr1)
```

Result
```
[1, 3, 4, 6]
[1, 3, 4, 6]
```

*Quick note about .sort()*
When you are sorting numbers greater than 9... You need to pass the "compare function" to the `sort method`. 
> As [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) consigns: **compareFunction** Specifies a function that defines the sort order. If omitted, the array elements are converted to strings, then sorted according to each character's Unicode code point value.

Example:
```javascript
const arr1 = [4,1,3,6,7,9,9,8,8,10,12];

const orderWithSort = [...arr1].sort()

const orderComparing = [...arr1].sort(function(a, b){return a-b})

console.log(`
orderWithSort: ${orderWithSort}

orderComparing: ${orderComparing}
`)
```

Output:
```
orderWithSort: 1,10,12,3,4,6,7,8,8,9,9

orderComparing: 1,3,4,6,7,8,8,9,9,10,12
```

---

Solution:

```javascript
const arr1 = [4,1,3,6,7,9,9,8,8,10,12];

const orderedArr1 = [...arr1].sort(function(a, b){return a-b})

function addTo12(arr) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left < right) {
  
    console.log(`Processing ${arr[left]} - ${arr[right]}`)
  
    if (arr[left] + arr[right] === 12) {
      return [arr[left], arr[right]]
    } else if (arr[left] + arr[right] > 12) {
      right--;
    } else {
      left++;
    }
  }
  
  return false

}

console.log(addTo12(orderedArr1))

console.log(orderedArr1)
```

Result:
```
Processing 1 - 12
Processing 1 - 10
Processing 3 - 10
Processing 3 - 9

[3, 9]

[1, 3, 4, 6, 7, 8, 8, 9, 10, 12]
```
