# Day 2: V8 Engine & JavaScript Execution

## 🎯 Learning Objectives
- Understand how V8 engine works
- Learn about Just-In-Time (JIT) compilation
- Explore memory management and garbage collection
- Understand call stack and execution context
- Debug Node.js applications effectively

## 📚 Theory

### What is V8?

V8 is Google's open-source JavaScript engine written in C++. It:
- Compiles JavaScript to native machine code
- Executes JavaScript code
- Handles memory allocation and garbage collection
- Powers Chrome browser and Node.js

```
┌─────────────────────────────────────────────┐
│          JavaScript Code                     │
├─────────────────────────────────────────────┤
│              V8 Engine                       │
│  ┌─────────────────────────────────────┐   │
│  │  Parser → AST → Bytecode → Machine  │   │
│  └─────────────────────────────────────┘   │
├─────────────────────────────────────────────┤
│          Machine Code Execution              │
└─────────────────────────────────────────────┘
```

### V8 Compilation Pipeline

**1. Parse → Abstract Syntax Tree (AST)**
```javascript
const sum = (a, b) => a + b;
```
↓
```
AST:
VariableDeclaration
├─ Identifier: sum
└─ ArrowFunctionExpression
   ├─ Parameters: [a, b]
   └─ BinaryExpression: a + b
```

**2. AST → Bytecode (Ignition Interpreter)**
```
Bytecode:
Ldar a0  // Load argument 0
Add a1   // Add argument 1
Return   // Return result
```

**3. Bytecode → Optimized Machine Code (TurboFan)**
- Hot functions get optimized
- Inline caching for property access
- Deoptimization when assumptions break

```
┌──────────┐     ┌──────────┐     ┌───────────┐     ┌──────────┐
│  Source  │ → Parser → │   AST    │ → Ignition → │ Bytecode  │ → Execute
│   Code   │     │          │     │           │     │           │
└──────────┘     └──────────┘     └───────────┘     └──────────┘
                                                            ↓
                                                     Is it hot?
                                                            ↓
                                                     ┌──────────┐
                                                  → │ TurboFan │ → Optimized
                                                     │ Compiler │    Machine
                                                     └──────────┘    Code
```

### Memory Management in V8

**Heap Memory Structure:**
```
┌─────────────────────────────────────────────────┐
│              V8 Heap Memory                      │
├─────────────────────────────────────────────────┤
│  New Space (Young Generation)                   │
│  - Nursery: Objects are created here            │
│  - Intermediate: Survived 1 GC                  │
│  Size: ~1-8 MB (small, fast GC)                │
├─────────────────────────────────────────────────┤
│  Old Space (Old Generation)                     │
│  - Long-lived objects promoted from New Space   │
│  - Large objects                                 │
│  Size: ~100+ MB (slower GC)                     │
├─────────────────────────────────────────────────┤
│  Code Space                                      │
│  - Compiled code                                 │
├─────────────────────────────────────────────────┤
│  Large Object Space                              │
│  - Objects > 1 MB                                │
└─────────────────────────────────────────────────┘
```

**Garbage Collection:**

V8 uses two main GC algorithms:

1. **Scavenge (Minor GC)** - New Space
   - Fast, frequent
   - Copying collector
   - Runs every few MB allocated

2. **Mark-Sweep-Compact (Major GC)** - Old Space
   - Slower, less frequent
   - Marks live objects → Sweeps dead → Compacts memory

### Call Stack & Execution Context

```javascript
function first() {
  console.log('First function');
  second();
  console.log('First function end');
}

function second() {
  console.log('Second function');
  third();
}

function third() {
  console.log('Third function');
}

first();
```

**Call Stack Evolution:**
```
Step 1:          Step 2:          Step 3:          Step 4:
│          │    │  first() │    │  first() │    │  first() │
│          │    │          │    │  second()│    │  second()│
│          │    │          │    │          │    │  third() │
│ global() │    │ global() │    │ global() │    │ global() │
└──────────┘    └──────────┘    └──────────┘    └──────────┘
```

### Execution Context

Each function call creates an execution context:

```javascript
let globalVar = 'global';

function outer() {
  let outerVar = 'outer';
  
  function inner() {
    let innerVar = 'inner';
    console.log(globalVar); // ✅ Accessible
    console.log(outerVar);  // ✅ Accessible
    console.log(innerVar);  // ✅ Accessible
  }
  
  inner();
}

outer();
```

**Execution Context Components:**
```
┌─────────────────────────────────────┐
│     Execution Context               │
├─────────────────────────────────────┤
│  1. Variable Environment            │
│     - let, const, var               │
│     - function declarations         │
│                                     │
│  2. Lexical Environment             │
│     - Scope chain                   │
│     - Outer environment reference   │
│                                     │
│  3. this binding                    │
│     - Determined at call time       │
└─────────────────────────────────────┘
```

## 🔗 Frontend Developer Perspective

**Browser Console Performance:**
```javascript
// Frontend: Profile code in browser
console.time('loop');
for (let i = 0; i < 1000000; i++) {
  // some operation
}
console.timeEnd('loop');
```

**Node.js Performance:**
```javascript
// Backend: Same API, same V8 engine!
console.time('database-query');
await db.query('SELECT * FROM users');
console.timeEnd('database-query');

// Memory usage
const used = process.memoryUsage();
console.log(`Heap used: ${used.heapUsed / 1024 / 1024} MB`);
```

## 💻 Practical Examples

### Example 1: Understanding Memory

```javascript
// memory-demo.js
function showMemoryUsage() {
  const used = process.memoryUsage();
  return {
    rss: `${Math.round(used.rss / 1024 / 1024)} MB`,       // Total memory
    heapTotal: `${Math.round(used.heapTotal / 1024 / 1024)} MB`, // Heap allocated
    heapUsed: `${Math.round(used.heapUsed / 1024 / 1024)} MB`,   // Heap used
    external: `${Math.round(used.external / 1024 / 1024)} MB`,   // C++ objects
  };
}

console.log('Initial:', showMemoryUsage());

// Create large array
const bigArray = new Array(1000000).fill('some data');
console.log('After array:', showMemoryUsage());

// Clear reference
bigArray.length = 0;
global.gc && global.gc(); // Force GC (run with --expose-gc)
console.log('After GC:', showMemoryUsage());
```

Run with:
```bash
node --expose-gc memory-demo.js
```

### Example 2: Optimized vs Deoptimized Code

```javascript
// optimization-demo.js

// ✅ OPTIMIZED: Consistent types
function addOptimized(a, b) {
  return a + b;
}

// Test with numbers only
for (let i = 0; i < 100000; i++) {
  addOptimized(i, i + 1); // V8 optimizes this
}

// ❌ DEOPTIMIZED: Mixed types
function addDeoptimized(a, b) {
  return a + b;
}

// Test with mixed types
for (let i = 0; i < 100000; i++) {
  if (i % 2 === 0) {
    addDeoptimized(i, i + 1);        // Number + Number
  } else {
    addDeoptimized(i, String(i));    // Number + String
  }
}
// V8 can't optimize - types keep changing
```

### Example 3: Understanding Call Stack

```javascript
// call-stack-demo.js

function a() {
  console.log('Function a - start');
  b();
  console.log('Function a - end');
}

function b() {
  console.log('Function b - start');
  c();
  console.log('Function b - end');
}

function c() {
  console.log('Function c');
  console.trace(); // Print call stack
}

a();

// Output shows the call stack:
// Function a - start
// Function b - start
// Function c
// Trace: at c (/path/to/file.js:14:11)
//        at b (/path/to/file.js:9:3)
//        at a (/path/to/file.js:4:3)
```

### Example 4: Stack Overflow

```javascript
// stack-overflow.js

// ❌ BAD: Infinite recursion
function recursive() {
  recursive(); // No base case!
}

try {
  recursive();
} catch (err) {
  console.error('Stack overflow:', err.message);
  // RangeError: Maximum call stack size exceeded
}

// ✅ GOOD: With base case
function factorial(n) {
  if (n <= 1) return 1; // Base case
  return n * factorial(n - 1);
}

console.log(factorial(5)); // 120
```

## 🛠️ Debugging Tools

### Using Node.js Inspector

```bash
# Start with inspector
node --inspect app.js

# Or with break on first line
node --inspect-brk app.js

# Then open Chrome DevTools
# chrome://inspect
```

### Built-in Profiling

```javascript
// profile.js
console.profile('MyProfile');

// Your code to profile
function heavyComputation() {
  let result = 0;
  for (let i = 0; i < 1000000; i++) {
    result += Math.sqrt(i);
  }
  return result;
}

heavyComputation();
console.profileEnd('MyProfile');
```

### V8 Options

```bash
# Print V8 options
node --v8-options

# Increase heap size
node --max-old-space-size=4096 app.js

# See optimization/deoptimization
node --trace-opt --trace-deopt app.js
```

## 🎯 Key Takeaways

1. V8 compiles JavaScript to **machine code** (not interpreted line-by-line)
2. **JIT compilation**: Interprets first, optimizes hot code later
3. **Memory** divided into New Space (young) and Old Space (old)
4. **Garbage collection** is automatic but can cause pauses
5. **Call stack** manages function execution context
6. Write **type-consistent code** for better optimization

## 📝 Performance Tips

```javascript
// ✅ DO: Consistent object shapes
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}
const p1 = new Point(1, 2);
const p2 = new Point(3, 4);

// ❌ DON'T: Changing object shapes
const p3 = { x: 1, y: 2 };
const p4 = { y: 4, x: 3 }; // Different order
p3.z = 5; // Adding property later

// ✅ DO: Use arrays for collections
const numbers = [1, 2, 3, 4, 5];

// ❌ DON'T: Mix types in arrays
const mixed = [1, 'two', { three: 3 }, null];

// ✅ DO: Preallocate arrays if size known
const arr = new Array(1000);

// ❌ DON'T: Let arrays grow dynamically if avoidable
const growing = [];
for (let i = 0; i < 1000; i++) growing.push(i);
```

## 📚 Resources

- [V8 Official Blog](https://v8.dev/blog)
- [How JavaScript Works: V8](https://blog.sessionstack.com/how-javascript-works-inside-the-v8-engine-5-tips-on-how-to-write-optimized-code-ac089e62b12e)
- [V8 Memory Management](https://deepu.tech/memory-management-in-v8/)

---

**Next**: [Exercises →](./exercises/README.md)
