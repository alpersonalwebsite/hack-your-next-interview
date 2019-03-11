# FizzBuzz

Output or log from 1 to n, sequentially...
* If number is multiple of 3 >> Fizz
* If number is multiple of 5 >> Buzz
* If number is multiple of 3 and 5 >> FizzBuzz
* In other cases, the value of the number

## Solution:

```javascript
function fizzBuzz(num) {
  for (let i = 1; i < num; i++) {
    if (i % 15 === 0) {
      console.log('FizzBuzz');
    } else if (i % 3 === 0) {
      console.log('Fizz');
    } else if (i % 5 === 0) {
      console.log('Buzz');
    } else {
      console.log(i);
    }
  }
}

fizzBuzz(20);
```

## Result:

```
1
2
Fizz
4
Buzz
Fizz
7
8
Fizz
Buzz
11
Fizz
13
14
FizzBuzz
16
17
Fizz
19
```
