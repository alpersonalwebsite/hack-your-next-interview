# What is the output...?

A whole category of interview question: you are shown a short program and asked what it prints. The point is
never the trivia. It is whether you can reason about scope, evaluation order and type coercion out loud,
which is what you will actually be doing on the job.

Every answer below is the real output, checked by `npm test`, so you can trust the comments and, better, run
the blocks yourself and change them.

## `var` in a loop with a callback

The classic, and still the most asked.

```javascript
for (var i = 1; i <= 3; i++) {
  setTimeout(() => console.log('var', i), 0);
}

for (let j = 1; j <= 3; j++) {
  setTimeout(() => console.log('let', j), 0);
}
```

Result:

```
var 4
var 4
var 4
let 1
let 2
let 3
```

`var` is function-scoped, so all three callbacks close over the SAME `i`, and by the time the timers run the
loop has finished and left it at 4. `let` is block-scoped and gets a fresh binding per iteration, so each
callback sees its own. If you are asked to fix the `var` version without changing `var`, the answer is an IIFE
that captures the value: `(function (n) { setTimeout(() => console.log(n), 0) })(i)`.

## Primitives copy, objects share

```javascript
let name = 'Peter';
let name1 = name;
name1 = 'Paul';
console.log(name, name1);
// Peter Paul

const list = [1, 2];
const list1 = list;
list1.push(3);
console.log(list, list1);
// [ 1, 2, 3 ] [ 1, 2, 3 ]

// Reassignment is the part that does not carry over.
let list2 = list;
list2 = ['new'];
console.log(list, list2);
// [ 1, 2, 3 ] [ 'new' ]
```

A primitive is copied by value, so the two names are independent from the moment you copy. An array or object
copies the REFERENCE, so both names point at one thing and mutating through either shows in both. Pointing one
of them at something new does not affect the other, because you changed which object the name refers to rather
than the object itself.

## Hoisting, and the two ways it behaves

```javascript
console.log(typeof declared);
// function

console.log(hoisted);
// undefined

function declared() {}
var hoisted = 'assigned later';
```

A `function` declaration is hoisted whole, so you can call it above where it is written. A `var` is hoisted as
a NAME only, initialised to `undefined`, and the assignment stays where you put it. `let` and `const` are
hoisted too but sit in the temporal dead zone until the declaration runs, which is why reading one early
throws instead of giving you `undefined`:

```javascript
// check: throws ReferenceError
console.log(early);
let early = 1;
```

## Coercion questions

```javascript
console.log(typeof null);
// object

console.log(0.1 + 0.2);
// 0.30000000000000004

console.log(0.1 + 0.2 === 0.3);
// false

console.log([] + {});
// [object Object]

console.log([1, 2] + [3]);
// 1,23

console.log('5' - 2, '5' + 2);
// 3 52
```

`typeof null` is a bug from the first version of JavaScript that can never be fixed without breaking the web.
The float arithmetic is IEEE 754 and not specific to this language: compare with a tolerance,
`Math.abs(a - b) < Number.EPSILON`. The rest is `+` being overloaded: with anything non-numeric it means
string concatenation, and arrays stringify by joining with commas, while `-` has only the numeric meaning so
it coerces.

## `this` in a regular function against an arrow

```javascript
const counter = {
  count: 0,
  regular: function () {
    return typeof this;
  },
  arrow: () => typeof this,
};

console.log(counter.regular());
// object

console.log(counter.arrow());
// undefined
```

A regular function's `this` is decided by HOW it is called, and calling it as `counter.regular()` makes `this`
the object. An arrow function has no `this` of its own and takes it from where it was defined, which here is
module scope, where `this` is `undefined`. That is why an arrow is the right choice for a callback inside a
method and the wrong choice for the method itself.
