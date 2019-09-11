# Maximum Profits

In this challenge you have to find the "maximum profit" picking the best moment (or value) to buy and the best to sell: you want to buy low and sell high.

Example: `[9,3,17,2,20,1,7]` 

Stock started with a value of 9 and ended with a value of 7.

* Highest: 20
* Lowest: 2
* Profit: 18

If you are asking why we picked `2` and not `1`, it's because we need to buy and then sell. So we buy at `2` and sell at `20`. 

Numbers, in this exercise, are always going to be greater than 0.

## Solutions summary
1. Maximum profit with nested loops and a tracking variable
2. Maximum profit with one loop and two tracking variables

---

## Solution 1: quadratic or O(n^2)

```javascript
const arr1 = [1,4,11,7];

function maxProfit(arr) {

  let profit = 0;

  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] - arr[i] > profit) {
        profit = arr[j] - arr[i]; 
        //console.log(`{I bought at ${arr[i]} and I'm comparing with ${arr[j]}. My profit is ${profit}}`)
      }
    }
  }
  
  return profit;
}

console.log(maxProfit(arr1));
```

## Result
```
10
```

## Solution 2: Linear or O(n)

```javascript
const arr1 = [1,4,11,7];

function maxProfit(arr) {
  let lowestPrice = arr[0];
  let profit = 0;

  for (let i = 0; i < arr.length; i++) {
    if (lowestPrice > arr[i]) lowestPrice = arr[i];
    if ((arr[i] - lowestPrice) > profit) profit = arr[i] - lowestPrice;
  }
  return profit;
}

console.log(maxProfit(arr1));
```

## Result
```
10
```