# Day 3: Event Loop Deep Dive

## 🎯 Learning Objectives
- Understand the Node.js event loop architecture
- Learn about the different phases of the event loop
- Master callback queue and microtask queue
- Understand blocking vs non-blocking operations
- Debug asynchronous code effectively

## 📚 Theory

### What is the Event Loop?

The event loop is what makes Node.js **non-blocking** and able to handle thousands of concurrent connections despite being **single-threaded**.

```
┌─────────────────────────────────────────────────┐
│    Node.js = Single-threaded + Event Loop        │
├─────────────────────────────────────────────────┤
│                                                  │
│  JavaScript Thread           libuv Thread Pool  │
│  ┌─────────────┐             ┌──────────────┐  │
│  │ Your Code   │             │ File I/O     │  │
│  │ Event Loop  │ ←───────→   │ DNS Lookup   │  │
│  │ Callbacks   │             │ Compression  │  │
│  └─────────────┘             └──────────────┘  │
│                                                  │
└─────────────────────────────────────────────────┘
```

**Key Concept**: Node.js can handle async I/O while running sync JavaScript on a single thread!

### Event Loop Phases

The event loop has **6 phases**, executed in order:

```
   ┌───────────────────────────┐
┌─>│           timers          │  setTimeout, setInterval
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │     pending callbacks     │  I/O callbacks deferred
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │       idle, prepare       │  Internal only
│  └─────────────┬─────────────┘      ┌────────────┐
│  ┌─────────────┴─────────────┐      │  incoming  │
│  │           poll            │<─────┤connections,│
│  └─────────────┬─────────────┘      │   data,    │
│  ┌─────────────┴─────────────┐      │   etc.     │
│  │           check           │      └────────────┘
│  └─────────────┬─────────────┘  setImmediate
│  ┌─────────────┴─────────────┐
│  │      close callbacks      │  socket.on('close')
│  └─────────────┬─────────────┘
└──────────────────┘
```

#### Phase Details:

1. **Timers**: Execute callbacks scheduled by `setTimeout()` and `setInterval()`
2. **Pending Callbacks**: Execute I/O callbacks deferred to the next iteration
3. **Idle, Prepare**: Internal use only
4. **Poll**: Retrieve new I/O events; execute I/O callbacks (most callbacks except close, timers, setImmediate)
5. **Check**: Execute `setImmediate()` callbacks
6. **Close Callbacks**: Execute close event callbacks (e.g., `socket.on('close')`)

### Microtasks vs Macrotasks

```
┌──────────────────────────────────────────────────┐
│              Task Queues                          │
├──────────────────────────────────────────────────┤
│                                                   │
│  Microtask Queue (Higher Priority)               │
│  ┌─────────────────────────────────────────┐   │
│  │ • process.nextTick()                    │   │
│  │ • Promise.then/catch/finally            │   │
│  │ • queueMicrotask()                      │   │
│  └─────────────────────────────────────────┘   │
│                                                   │
│  Macrotask Queue (Lower Priority)                │
│  ┌─────────────────────────────────────────┐   │
│  │ • setTimeout()                           │   │
│  │ • setInterval()                          │   │
│  │ • setImmediate()                         │   │
│  │ • I/O operations                         │   │
│  └─────────────────────────────────────────┘   │
│                                                   │
└──────────────────────────────────────────────────┘
```

**Priority Order:**
1. `process.nextTick()` - Highest priority
2. Promise microtasks
3. `setImmediate()` (in check phase)
4. `setTimeout()` (in timers phase)

### Execution Order Example

```javascript
console.log('1: Start');

setTimeout(() => {
  console.log('2: setTimeout');
}, 0);

setImmediate(() => {
  console.log('3: setImmediate');
});

Promise.resolve().then(() => {
  console.log('4: Promise');
});

process.nextTick(() => {
  console.log('5: nextTick');
});

console.log('6: End');

// Output:
// 1: Start
// 6: End
// 5: nextTick         (process.nextTick - highest priority)
// 4: Promise          (Promise microtask)
// 2: setTimeout       (or 3 - depends on timing)
// 3: setImmediate     (or 2)
```

**Why this order?**
1. Synchronous code runs first (1, 6)
2. Microtasks run after each phase (5, 4)
3. Then macrotasks (2, 3)

## 🔗 Frontend Developer Perspective

**Browser Event Loop:**
```javascript
// Frontend: Browser event loop
console.log('Start');

setTimeout(() => {
  console.log('Timeout');
}, 0);

Promise.resolve().then(() => {
  console.log('Promise');
});

console.log('End');

// Browser Output:
// Start → End → Promise → Timeout
```

**Node.js Event Loop:**
```javascript
// Backend: Node.js event loop
console.log('Start');

setTimeout(() => {
  console.log('Timeout');
}, 0);

setImmediate(() => {
  console.log('Immediate');
});

Promise.resolve().then(() => {
  console.log('Promise');
});

process.nextTick(() => {
  console.log('NextTick');
});

console.log('End');

// Node.js Output:
// Start → End → NextTick → Promise → Timeout → Immediate
```

**Key Difference**: Node.js has more granular control with `process.nextTick()` and `setImmediate()`.

## 💻 Practical Examples

### Example 1: Understanding nextTick

```javascript
// next-tick-demo.js

console.log('Start');

setTimeout(() => {
  console.log('Timeout 1');
  
  process.nextTick(() => {
    console.log('NextTick inside Timeout');
  });
}, 0);

process.nextTick(() => {
  console.log('NextTick 1');
  
  process.nextTick(() => {
    console.log('NextTick 2 (nested)');
  });
});

Promise.resolve().then(() => {
  console.log('Promise 1');
});

console.log('End');

// Output:
// Start
// End
// NextTick 1
// NextTick 2 (nested)
// Promise 1
// Timeout 1
// NextTick inside Timeout
```

### Example 2: Blocking vs Non-blocking

```javascript
// blocking-vs-nonblocking.js
const fs = require('fs');

console.log('1. Start');

// ❌ BLOCKING: Synchronous file read
const data1 = fs.readFileSync('file.txt', 'utf8');
console.log('2. Sync file read complete');

// ✅ NON-BLOCKING: Asynchronous file read
fs.readFile('file.txt', 'utf8', (err, data) => {
  console.log('4. Async file read complete');
});

console.log('3. After async call');

// Output:
// 1. Start
// 2. Sync file read complete (blocks here)
// 3. After async call
// 4. Async file read complete (when ready)
```

**Visualization:**
```
Blocking:
──────────[File Read]────────► Next Line
          (waits here)

Non-blocking:
─► Start File Read ─► Continue Code ─► Callback When Ready
   (doesn't wait)
```

### Example 3: setTimeout vs setImmediate

```javascript
// timer-vs-immediate.js

// Case 1: Outside I/O cycle - order not guaranteed
setTimeout(() => {
  console.log('setTimeout');
}, 0);

setImmediate(() => {
  console.log('setImmediate');
});

// Case 2: Inside I/O cycle - setImmediate always first
const fs = require('fs');
fs.readFile(__filename, () => {
  setTimeout(() => {
    console.log('I/O setTimeout');
  }, 0);
  
  setImmediate(() => {
    console.log('I/O setImmediate');
  });
});

// Possible outputs:
// setTimeout → setImmediate (or reversed)
// I/O setImmediate → I/O setTimeout (always)
```

### Example 4: Event Loop Phases Demo

```javascript
// event-loop-phases.js

const fs = require('fs');

console.log('1: Synchronous');

setTimeout(() => console.log('2: setTimeout 0'), 0);
setTimeout(() => console.log('3: setTimeout 50'), 50);

setImmediate(() => console.log('4: setImmediate'));

process.nextTick(() => console.log('5: nextTick'));

Promise.resolve().then(() => console.log('6: Promise'));

fs.readFile(__filename, () => {
  console.log('7: File I/O');
  
  setTimeout(() => console.log('8: setTimeout in I/O'), 0);
  setImmediate(() => console.log('9: setImmediate in I/O'));
  
  process.nextTick(() => console.log('10: nextTick in I/O'));
});

console.log('11: Synchronous End');

// Likely output:
// 1: Synchronous
// 11: Synchronous End
// 5: nextTick
// 6: Promise
// 2: setTimeout 0
// 4: setImmediate
// 7: File I/O
// 10: nextTick in I/O
// 9: setImmediate in I/O
// 8: setTimeout in I/O
// 3: setTimeout 50
```

### Example 5: Debugging Event Loop

```javascript
// debug-event-loop.js

function trackEventLoop() {
  const start = Date.now();
  
  setTimeout(() => {
    const delay = Date.now() - start;
    console.log(`setTimeout executed after ${delay}ms`);
  }, 100);
  
  setImmediate(() => {
    const delay = Date.now() - start;
    console.log(`setImmediate executed after ${delay}ms`);
  });
  
  // Simulate blocking operation
  const blockEnd = Date.now() + 200;
  while (Date.now() < blockEnd) {
    // Blocking the event loop!
  }
  
  console.log('Blocking operation complete');
}

trackEventLoop();

// Output shows setTimeout delayed by blocking code
```

## 🎯 Common Patterns

### Pattern 1: Deferring Execution

```javascript
// Defer to next tick
function deferredLog(message) {
  process.nextTick(() => {
    console.log(message);
  });
}

console.log('Before');
deferredLog('Deferred');
console.log('After');

// Output: Before → After → Deferred
```

### Pattern 2: Breaking Long Operations

```javascript
// Break long computation into chunks
function processItems(items) {
  let index = 0;
  
  function processNext() {
    if (index >= items.length) return;
    
    // Process one item
    console.log(`Processing item ${index}: ${items[index]}`);
    index++;
    
    // Schedule next item (don't block event loop)
    setImmediate(processNext);
  }
  
  processNext();
}

processItems(['A', 'B', 'C', 'D', 'E']);
```

### Pattern 3: Avoiding nextTick Recursion

```javascript
// ❌ BAD: Can starve event loop
function badRecursion() {
  process.nextTick(badRecursion);
}

// ✅ GOOD: Use setImmediate for recursion
function goodRecursion() {
  setImmediate(goodRecursion);
}
```

## 🎯 Key Takeaways

1. **Single-threaded**: JavaScript runs on one thread with event loop
2. **Non-blocking**: Async operations don't block the main thread
3. **Phase-based**: Event loop cycles through phases
4. **Microtasks first**: `process.nextTick()` and Promises run before macrotasks
5. **Don't block**: Avoid heavy synchronous operations

## 📝 Best Practices

```javascript
// ✅ DO: Use async operations
fs.readFile('file.txt', (err, data) => {
  // Non-blocking
});

// ❌ DON'T: Use sync operations in production
const data = fs.readFileSync('file.txt');

// ✅ DO: Break up long-running tasks
function processLarge(data) {
  const chunkSize = 100;
  let index = 0;
  
  function processChunk() {
    const chunk = data.slice(index, index + chunkSize);
    // Process chunk...
    
    index += chunkSize;
    if (index < data.length) {
      setImmediate(processChunk);
    }
  }
  
  processChunk();
}

// ❌ DON'T: Process everything at once
function processAll(data) {
  data.forEach(item => {
    // Process all items (blocks event loop)
  });
}
```

## 📚 Resources

- [Node.js Event Loop Official Guide](https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/)
- [Event Loop Visualizer](http://latentflip.com/loupe/)
- [Understanding Event Loop](https://blog.insiderattack.net/event-loop-and-the-big-picture-nodejs-event-loop-part-1-1cb67a182810)

---

**Next**: [Exercises →](./exercises/README.md)
