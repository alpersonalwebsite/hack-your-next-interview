# Binary Search Tree

Create a `Hash Table` (with 26 buckets) and a `Node` using the `class keyword` and add through the Hash Table prototype a function to insert/add a Node previously "hashed".

For demo purposes, the hash function should take the first letter of the key and store the key/value data in the proper bucket (or cell). _There´s not going to be real hash_. Feel free to do it!

You will have one bucket per letter of the Alphabet.
For example:

```
A >> 0
B >> 1
C >> 2
```

Add a collision.

## Solution:

```JavaScript
class HasthTable {
  constructor(length) {
    this.buckets = Array(length);
    this.numberOfBuckets = this.buckets.length;
  }
}

class Node {
  constructor(key, value, next) {
    this.key = key;
    this.value = value;
    // In case of collisions
    this.next = next || null;
  }
}

// This IS not hashing
// Feel free to replace with a real hash function
HasthTable.prototype.hash = function(key) {
  const abc = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p',
'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

  const result = abc.indexOf(key[0].toLowerCase());
  const bucket = result % this.numberOfBuckets;
  return bucket;
}

HasthTable.prototype.add = function(key, value) {
  key = key.toLowerCase();
  // We only accept string
  if (key.replace(/[a-z]/g, '') || key.length < 1) {
    console.log('Provide a valid key!')
    return;
  }


  const bucketIndex = this.hash(key);

  // If we dont have nothing in that bucket
  if (!this.buckets[bucketIndex]) {
    this.buckets[bucketIndex] = new Node(key, value)
  }

  else {
    const currentNode = this.buckets[bucketIndex];
    while (currentNode.next) {
      currentNode = currentNode.next;
    }
    currentNode.next = new Node(key, value);
  }
}


// ABC > 26
let HT = new HasthTable(26);
HT.add('Casa', 'Casa Grande');
HT.add('A', 'Hello');
HT.add('Adding', 'Adding collision')

console.log(HT);
```

## Result:

Time may vary in relation to the processes running on your machine.

```
HasthTable {
  buckets:
   [ Node { key: 'a', value: 'Hello', next: [Object] },
     <1 empty item>,
     Node { key: 'casa', value: 'Casa Grande', next: null },
     <23 empty items> ],
  numberOfBuckets: 26 }
```
