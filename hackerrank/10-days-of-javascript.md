# 10 days of JavaScript 
These set is really basi;, however, I will include some examples, mostly, those that I can use as triggers to address other topics or `better design practices`.

## Day 1: Let and const

Define constants and output the `area` and `perimeter` values given `r` radius of a `circle`.

```javascript
// ...
  const PI = Math.PI;
  const  r = readLine();
  const area = PI * (r * r);
  const perimeter = 2 * PI * r;
  
  console.log(area)
    
  console.log(perimeter)
//...
```

High-level `Circle` intro: [What is a Circle...?](http://math2.org/math/geometry/circles.htm)

In a "real world case", probably, you will want to create a file where you define particular `functions` and import them as you need.

* Example with flag `--experimental-modules calculations` and `*.mjs`: [geometry](./geometry/README.md)

* Same example using `esm` package: [geometry](./geometry1/README.md)

---

## Day 2: Conditional Statements: Switch

This is an interesting but controversial case... `switch with non-fixed values or conditions` as a possible solution.

Please, don't get me wrong... `hackerrank` doesn't suggest to follow the subsequent approach; nonetheless, if you apply it you will not receive any linting complain and all test will pass.

Enough talk... Let's go to the code!

Take a look to [MDN web docs - Switch](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch) 

> The switch statement evaluates an expression, matching the expression's value to a case clause, and executes statements associated with that case, as well as statements in cases that follow the matching case.

Example:
```javascript
let expression = 'B'
let result

switch(expression) {
  case 'A':
    result = 'Is A'
    break;
  default:
    result = 'Not A'
}


console.log(result)
```

Output:
`Not A`

But... What happens if we want to execute "some amount of logic", setting, for example, the value of our expression to a boolean, `true`, and checking if one our cases logic results in true.

Example:
```javascript
const getLetter = (s) => {
  let letter;

  const group1 = ['a', 'e', 'i', 'o', 'u'];
  const group2 = ['b', 'c', 'd', 'f', 'g'];
  const group3 = ['h', 'j', 'k', 'l', 'm'];
  const group4 = ['n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'y', 'z'];

  switch (true) {
    case (group1.indexOf(s) !== -1):
      letter = 'A';
      break;
    case (group2.indexOf(s) !== -1):
      letter = 'B';
      break;
    case (group3.indexOf(s) !== -1):
      letter = 'C';
      break;
    case (group4.indexOf(s) !== -1):
      letter = 'D';
      break;
    default:
      letter = 'Bug'
  }
  return letter;
}

console.log(getLetter('f'))
console.log(getLetter('a'))
console.log(getLetter('x'))
console.log(getLetter('aa'))
```

Output:
```
B
A
D
Bug
```
Most people will recommend you to use `if/else statements` instead, and avoid some buggy scenarios... And I'm among them! You are warned! 

---

