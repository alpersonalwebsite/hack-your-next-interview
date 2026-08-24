# FizzBuzz

Output or log from 1 to n, sequentially...
* Fizz >> If number is multiple of 3
* Buzz >> If number is multiple of 5
* FizzBuzz >> If number is multiple of 3 and 5
* In other cases, the value of the number

*NOTE:* You will see this question also in the form of... 
> Given a number, return `Fizz`, `Buzz`, `FizzBuzz` or the `number`

## Solution:

```javascript
function fizzBuzz(num) {
  
  // We check that the type of num is number
  if (typeof num !== 'number') return NaN;
  
  for (let i = 1; i <= num; i++) {
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
Buzz
```

A note on the loop condition, because this is the classic way to get FizzBuzz wrong in an interview. It used
to read `i < num`, which stops at 19 for `fizzBuzz(20)`. The task above says "from 1 to n", and 20 is a
multiple of 5, so the answer was missing its last line and the documented output agreed with the code rather
than with the spec. That is the worst kind of off-by-one: everything looks right, including the output you
pasted, because both come from the same wrong loop. `i <= num` is the fix, and reading your own output against
the SPEC rather than against the code is the habit.
