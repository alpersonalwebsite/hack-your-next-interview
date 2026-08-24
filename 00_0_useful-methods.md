# Useful methods

The array, string and object operations that come up over and over in challenges, each one with the result it
actually produces. The point of keeping them together is to be able to say "that is a `shift`" in an interview
without pausing, and to know which of them mutate, because that is what gets you.

The mutating ones are marked. `push`, `pop`, `shift`, `unshift`, `sort`, `reverse` and `splice` change the
array you call them on; everything else here returns something new.

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

Strings are immutable, so none of these change the original: they all return a new string.

### Split into characters, and back

```javascript
const str = 'Peter';
console.log(str.split(''));
// [ 'P', 'e', 't', 'e', 'r' ]
console.log(str.split('').reverse().join(''));
// reteP
```

### Case, trimming and searching

```javascript
console.log('  Peter  '.trim());
// Peter
console.log('Peter'.toLowerCase(), 'peter'.toUpperCase());
// peter PETER
console.log('Peter'.includes('ete'), 'Peter'.indexOf('ete'));
// true 1
console.log('Peter'.startsWith('Pe'), 'Peter'.endsWith('er'));
// true true
```

`includes` answers a yes/no question and `indexOf` tells you where, returning `-1` when it is absent. Reach for
`includes` unless you need the position, because `indexOf(x) !== -1` is the older spelling of the same thing
and reads worse.

### Slice, and the negative-index trick

```javascript
const str = 'interview';
console.log(str.slice(0, 5));
// inter
console.log(str.slice(-4));
// view
console.log(str.at(-1));
// w
```

A negative argument counts from the end, which saves a `length - n`. `at(-1)` is the readable way to get the
last character; `str[str.length - 1]` is the same thing spelled longer.

### Replace, and the one that catches people

```javascript
console.log('a-b-c'.replace('-', '+'));
// a+b-c
console.log('a-b-c'.replaceAll('-', '+'));
// a+b+c
console.log('a-b-c'.replace(/-/g, '+'));
// a+b+c
```

`replace` with a string replaces the FIRST match only. That is the bug in half the "strip the punctuation"
answers people give: it needs `replaceAll`, or a regex with the `g` flag.

## Objects

### Keys, values, entries

```javascript
const scores = { Peter: 1, Wendy: 2 };
console.log(Object.keys(scores));
// [ 'Peter', 'Wendy' ]
console.log(Object.values(scores));
// [ 1, 2 ]
console.log(Object.entries(scores));
// [ [ 'Peter', 1 ], [ 'Wendy', 2 ] ]
```

`Object.entries` is what turns an object into something you can `map` or `sort`, which is the usual next step
in a counting challenge: count into an object, then `Object.entries(counts).sort((a, b) => b[1] - a[1])` gives
you the most frequent first.

### Does the key exist, and why `in` is not enough

```javascript
const scores = { Peter: 0 };
console.log(scores.Peter ? 'truthy' : 'falsy');
// falsy
console.log('Peter' in scores);
// true
console.log(Object.hasOwn(scores, 'Peter'));
// true
console.log('toString' in scores, Object.hasOwn(scores, 'toString'));
// true false
```

This is the trap behind a lot of counting bugs, including one on the [occurrences](./03_0_occurrences.md) page:
a count of `0` is falsy, so `if (counts[char])` reads "no such key" when the answer is "the key is there and
its value is zero". `in` fixes that but also finds inherited keys like `toString`, which is why
`Object.hasOwn` is the one to reach for.

### Copying

```javascript
const original = { name: 'Peter', address: { city: 'Neverland' } };
const copy = { ...original };

copy.name = 'Wendy';
console.log(original.name);
// Peter

copy.address.city = 'London';
console.log(original.address.city);
// London
```

A spread copies one level. The nested object is shared, so writing through the copy changes the original.

If you need a genuinely independent copy, `structuredClone(original)` is the built-in one and handles dates,
maps, sets and cycles. `JSON.parse(JSON.stringify(original))` is the older trick and loses things quietly: a
`Date` comes back as a string, a function or an `undefined` property disappears, and a cycle throws. Neither
copies methods, so a class instance needs rebuilding rather than cloning.
