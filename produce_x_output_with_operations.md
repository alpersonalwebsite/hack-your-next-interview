# Produce X output through basic mathematical operations

We have an `array` and we want to find the `2 numbers` (in cases of multiple combinations the `first 2`) that through `addition, subtraction, multiplication or division` produces `x` number.

Examples:
* `[4,1,3,6]` and we want to `add to 7`

   * First combination respecting order: `4,3`
   * All (2 num) combinations: `4,3` and `1,6` 

Sometimes, the request can include sorting. Remember to check our [Sorting Section](./00_1_useful-methods-sorting)

Also, you could receive a `string` of numbers and have to produce first an `array`. *Important*: this will work just with *single digits*.
```javascript
'347932'.split('')
```

Output:
```
["3", "4", "7", "9", "3", "2"]
```

## Solution 1: nested for loops (quadratic)

```javascript
const arr1 = [4,1,3,6];

function addTo7(arr) {
  for (let i = 0; i < arr.length; i++ ) {
    for (let j = i + 1; j < arr.length; j++) {
      console.log(arr[i], arr[j])
      if (arr[i] + arr[j] === 7) return [arr[i], arr[j]]
    }
  }
}


console.log(addTo7(arr1))
```

Output:
```
4 1
4 3
[4, 3]
```