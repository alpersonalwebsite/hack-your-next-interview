# OOP with JS

## Creating objects

**Literal notation**

```js
const myObj = {};
```

**Constructor Function**

```js
const myObj = new Object();
```

*Literal notation* is faster and less verbose.

## Adding properties

```js
const myObj = {}

myObj.someProperty = 123

myObj['property with special chars'] = 'abc'

myObj.someMethod = function() {
  return 'Hi!'
}

console.log(myObj.someProperty)
// 123

console.log(myObj['property with special chars'])
// abc

console.log(myObj.someMethod())
// Hi!
```

## Removing properties

```js
const myObj = {}

myObj.someProperty = 123

delete myObj.someProperty

console.log(myObj)
```

Both previous methods to `ADD` and `DELETE` properties mutate the `object`. 

In **JavaScript** we have `primitive` (string, number, boolean, etc) and `reference types` (objects and its special object type, array)

Primitives are immutable while reference types are mutable. 

Let's see some examples to illustrate the previous statements. They will also help us to start talking about `scopes`

1. `var` holding a `primitive` value and a `function updating` the value of that variable

```js
var primitive = 123

function updt(n) {
  primitive = n
}

updt(1)

console.log(primitive)
// 1

console.log(window.var)
// 1
```

Some considerations...
When we use `var`, the scope is going to be global/window or the function within its declared.
If we add the `var statement` inside the function we will have a totally different result, since now, we have 2 primitive variables, one scoped to the global object (in the browser, `window`) and the other to the function `updt`

```js
var primitive = 123

function updt(n) {
  var primitive = n
  return n
}

updt(1)

console.log(window.primitive)
// 123

console.log(updt(1))
// 1
```

Remember, since our variable is scoped to the `updt function`, every other `function` within this one will have access to it.

```js
var primitive = 123

function updt(n) {
  var primitive = n
  return function insideUpdt() {
    return primitive
  }()
}

updt(1)

console.log(console.log(updt(1)))
```

*Note*: Here we are returning what the invocation of `insideUpdt()` returns, that's why we have the extra `()`. And yes, we could totally avoid naming our function (aka, use an anonymous function) but, for debugging purposes, named function always help.