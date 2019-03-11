# Sorting

Sometimes, you will be asked to sort without using the `sort()` method.

We are going to contemplate 2 cases.
* **Case 1:** 2 sorted arrays combined into a new sorted array.
Example: [1,5,10,20] and [6,80,99,100,1001] should return [1,5,6,10,20,80,99,100,1001]

* **Case 2:** 1 unsorted array to sort: [1,0,100,10,4] should return [0,1,4,10,100]

One quick note:
Avoid `Selection Sort` and `Bubble Sort` since you will end with a `quadratic solution` O(n^2) or O(n*m) which should not be acceptable from a performance point of view.
If you don´t know these "sorting algorithms", they are nested for loops implementations (at a high level).

Example: **Case 1**
```javascript
const array1 = [1,5,10,20];
const array2 = [6,80,99,100,1001];

function mergeAndSort(arr1, arr2) {
  const result = [];

  while(arr1.length && arr2.length) {
    if (arr1[0] > arr2[0]) {
      // We push what we are removing from the beginning
      result.push(arr2.shift())
    } else {
      result.push(arr1.shift())
    }
  }

  return [...result, ...arr1, ...arr2];
}

console.log(mergeAndSort(array1, array2));
```

Result:
```
[ 1, 5, 6, 10, 20, 80, 99, 100, 1001 ]
```

Nothing too complex or difficult to understand. But, you could be a little confused with the following line:
```
return [...result, ...arr1, ...arr2];
```

*What are we doing...?*
For this, first we have to go back to our while loop. Feel free to put a logger function inside it, logging on each loop iteration the new "state" or values (aka, elements) that both arrays are holding.

Example logs result:
```javascript
[ 5, 10, 20 ] [ 6, 80, 99, 100, 1001 ]
[ 10, 20 ] [ 6, 80, 99, 100, 1001 ]
[ 10, 20 ] [ 80, 99, 100, 1001 ]
[ 20 ] [ 80, 99, 100, 1001 ]
[] [ 80, 99, 100, 1001 ]
```

*What is the main logic of our iteration...?*
We are comparing the first element of each array, and pushing the lowest one into our queue or result array.

The while loop will execute or iterate while both conditions are true... Or what´s the same, until one of the arrays has no more elements (or it´s empty).

Remember that in every loop, we remove one element of either array1 or array2. So, after the 5 cycle (in our example), our while evaluates the condition and, since one of our arrays is empty, it passes to the next step which is returning.

But, as you can see we still have several elements in one of our arrays:
```javascript
[] [ 80, 99, 100, 1001 ]
```

We are working with 2 sorted arrays. For this example, once we exit the loop, it doesn´t matter which array still have elements: always we will have one array empty and the other with some values.

```
[] [ elements ]
[ elements ] []
```

Now, you are probably thinking... "Well, I should determine which is empty and add all the elements of the non-empty to the end of the result array since both arrays are sorted".
*Great! You got it!*
There are many ways of checking which is not the empty array and adding its content to the queue or result array, however, the easiest and cleanest one comes from the hands of es2015, using the `spread operator` (...)

Let´s see first a conceptual example:
```
1 + 0 + 2 = 3

'H' + '' + 'i' = 'Hi'

[1,2] + [] + [4,5] = [1,2,4,5]
```

... and now, come back to our return ...
```
return [...result, ...arr1, ...arr2];
```

We return a new array which is going to have:
* FIRST: all the elements of result
* SECOND: all the elements of arr1
* THIRD: all the elements of arr2
Yes! The order is important since we are working with sorted elements or values! Well, we can reduce the logic to: always start spreading result or what we have in our queue.

As we saw in our conceptual example, it doesn´t matter if one or all the arrays are empty. Empty arrays cannot spread elements, so, in our example, arr1 which is an empty collection will not add any element.

Sometimes the first array is going to be empty, other times the second. You can avoid several lines of code spreading the values of the 3 arrays without having to check which array has elements and add them to the result.

---

The other case that we have is when the input is *one unsorted array*

What we want to do...?

PART ONE: Slice *recursively* the array "in half" until we reach the length of ONE element, then (when we meet the "base case"), return the sliced array.
Conceptual example for input: [1,0,100]

```
Original: [1,0,100]
First slice: [1] and [0,100]
Second slice: [0] and [100]
```
Example:
```javascript
function sliceArrayRec(arr) {
  if (arr.length < 2) {
    console.log('********** ', arr)
    return arr;
  }
  const middle = Math.floor(arr.length / 2);

  const arr1 = arr.slice(0, middle);
  const arr2 = arr.slice(middle);

  console.log(arr1);
  console.log(arr2);

  console.log('-------');

  // recursion
  sliceArrayRec(arr1);
  sliceArrayRec(arr2);

}

sliceArrayRec([1,0,100]);
```

And the output will be:
```
[ 1 ]
[ 0, 100 ]
-------
**********  [ 1 ]
[ 0 ]
[ 100 ]
-------
**********  [ 0 ]
**********  [ 100 ]
```

Remember our conceptual table...
The first time we execute the function we slice the array and, since the first subarray (part) has JUST one element we return it.
Result: [ 1 ] [ 0, 100 ] and return [ 1 ]
Given that we met the base case (one element), we move then to execute our function passing as parameter the second subarray: `[ 0, 100 ]`. Now, we are going to have -again- two arrays and inasmuch as both have "one element", we return both elements: [ 0 ] and [ 100 ].

It could take you some time to adapt your "mindset" to the concept of recursion. In other tutorials, we are going to address it properly, however, you can see it as a function *calling itself until a "base case" is reached*.

Maybe a quick and simplest example can help:

```javascript
function countDown(num) {
  if (num === 0) {
    return;
  }

  console.log(num);

  countDown(num - 1);
}

countDown(6);
```

Output:
```
6
5
4
3
2
1
```

We invoke the function with 6.
6 is not strictly equal to 0 so we log in the console and call the same function passing the result of 6 - 1... And so on. Once we reach 0, we return, stopping the function´s execution.
**Important:** You need a "base case" and return to **avoid an infinite loop**.

Let´s go back... Once our `sliceArrayRec(arr)` function received [ 0, 100 ] it returned 2 arrays: [ 0 ] and [ 100 ].

Luckily for us, for **Case 1** we created a function, `mergeAndSort(arr1, arr2)` which receives **2 sorted arrays** as input and it returns ONE sorted array. If we pass [ 0 ] and [ 100 ] arguments, the output will be [0, 100].
Remember: as we have 2 arrays with 1 element each... There´s no need for sort. This, allows us to meet the criteria of `mergeAndSort(arr1, arr2)`
1. 2 inputs (aka, parameters): 2 arrays
2. Both arrays must be sorted

Let´s integrate both function:
```javascript
function mergeAndSort(arr1, arr2) {
  const result = [];

  console.log('mergeAndSort', arr1, arr2)

  while(arr1.length && arr2.length) {
    if (arr1[0] > arr2[0]) {
      // We push what we are removing from the beginning
      result.push(arr2.shift())
    } else {
      result.push(arr1.shift())
    }
  }

  return [...result, ...arr1, ...arr2];
}

function sliceArrayRec(arr) {
  if (arr.length < 2) {
    console.log('**********', arr)
    return arr;
  }
  const middle = Math.floor(arr.length / 2);

  const arr1 = arr.slice(0, middle);
  const arr2 = arr.slice(middle);

  console.log('sliceArrayRec', arr1, arr2);

  console.log('-------');

  // recursion
  return mergeAndSort(sliceArrayRec(arr1), sliceArrayRec(arr2));

}

sliceArrayRec([1,0,100,5,2]);
```

Result:
```
sliceArrayRec [ 1, 0 ] [ 100, 5, 2 ]
-------
sliceArrayRec [ 1 ] [ 0 ]
-------
********** [ 1 ]
********** [ 0 ]
mergeAndSort [ 1 ] [ 0 ]
sliceArrayRec [ 100 ] [ 5, 2 ]
-------
********** [ 100 ]
sliceArrayRec [ 5 ] [ 2 ]
-------
********** [ 5 ]
********** [ 2 ]
mergeAndSort [ 5 ] [ 2 ]
mergeAndSort [ 100 ] [ 2, 5 ]
mergeAndSort [ 0, 1 ] [ 2, 5, 100 ]
=> [ 0, 1, 2, 5, 100 ]
```

As you can see, I´m logging some "info" in the console to keep things clear and easy.
