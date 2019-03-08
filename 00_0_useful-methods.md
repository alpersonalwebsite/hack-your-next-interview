# Useful methods

TO DO: Description or intro...

## Arrays

### Add element at the beginning: [+element,1,2,3]

```javascript
const arr = [1, 2, 3];
arr.unshift(0);
console.log(arr);
```

Result: `[ 0, 1, 2, 3 ]`

### Add element at the end: [1,2,3,+element]

```javascript
const arr = [1, 2, 3];
arr.push(0);
console.log(arr);
```

Result: `[ 1, 2, 3, 0 ]`

### Remove first element: [-element,1,2,3]

```javascript
const arr = [1, 2, 3];

// we can store that element in a variable
// const first = arr.shift();

arr.shift();
console.log(arr);
```

Result: `[ 2, 3 ]`

### Remove element at the end: [1,2,3,-element]

```javascript
const arr = [1, 2, 3];

// we can store that element in a variable
// const last = arr.pop();

arr.pop();
console.log(arr);
```

Result: `[ 1, 2 ]`

## Strings

## Objects
