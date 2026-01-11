# Day 1: Exercises

## 🎯 Exercise Goals
- Get comfortable with Node.js REPL
- Write and execute Node.js scripts
- Explore global objects
- Understand Node.js vs Browser differences

---

## Exercise 1: REPL Exploration (15 min)

**Objective**: Get familiar with Node.js REPL

1. Open terminal and type `node` to enter REPL
2. Try these operations:

```javascript
// Basic operations
1 + 1
'Hello' + ' World'
[1, 2, 3].map(x => x * 2)

// Variables
const greeting = 'Hello Node.js'
greeting.toUpperCase()

// Functions
function multiply(a, b) {
  return a * b;
}
multiply(5, 7)

// Global objects
global
process.version
process.platform

// Tab completion - try typing:
process.  // then press TAB twice
```

3. Experiment with `.help` command to see available commands
4. Exit with `.exit` or `Ctrl + C` twice

---

## Exercise 2: System Information Script (20 min)

**Objective**: Create a script that displays system information

Create `system-info.js`:

```javascript
// TODO: Log Node.js version
// TODO: Log operating system platform
// TODO: Log current working directory
// TODO: Log the script's absolute path
// TODO: Log available memory
// TODO: Log CPU architecture
```

**Expected Output:**
```
=== System Information ===
Node Version: v20.x.x
Platform: darwin (or win32, linux)
Current Directory: /Users/jamestran/...
Script Path: /Users/jamestran/.../system-info.js
Architecture: x64
```

**Hints:**
- Use `process.version`
- Use `process.platform`
- Use `process.cwd()`
- Use `__filename`
- Use `process.arch`

**Run it:**
```bash
node system-info.js
```

---

## Exercise 3: Environment Variables (20 min)

**Objective**: Work with environment variables

Create `env-demo.js`:

```javascript
// TODO: Read NODE_ENV environment variable
// TODO: If NODE_ENV is 'production', log "Running in production mode"
// TODO: If NODE_ENV is 'development', log "Running in development mode"
// TODO: If not set, log "Environment not specified, defaulting to development"

// TODO: Create a custom environment variable and read it
```

**Run with different environments:**
```bash
# Default
node env-demo.js

# Development
NODE_ENV=development node env-demo.js

# Production
NODE_ENV=production node env-demo.js

# Custom variable
API_KEY=secret123 node env-demo.js
```

**Challenge**: Create a config object based on environment:
```javascript
const config = {
  environment: process.env.NODE_ENV || 'development',
  apiUrl: process.env.NODE_ENV === 'production' 
    ? 'https://api.production.com' 
    : 'http://localhost:3000',
  // Add more config...
};
```

---

## Exercise 4: Command Line Arguments (25 min)

**Objective**: Learn to accept and process command-line arguments

Create `greeting.js`:

```javascript
// TODO: Get command line arguments
// TODO: Extract the name from arguments
// TODO: Create a personalized greeting
// TODO: Handle case when no name is provided

// Example usage:
// node greeting.js John
// Output: Hello, John! Welcome to Node.js

// node greeting.js
// Output: Hello, stranger! Welcome to Node.js
```

**Hints:**
- Arguments are in `process.argv`
- `process.argv[0]` is the Node.js path
- `process.argv[1]` is the script path
- `process.argv[2]` and onwards are your custom arguments

**Advanced**: Create a calculator that accepts operations:
```javascript
// calculator.js
// node calculator.js add 5 3    -> 8
// node calculator.js multiply 4 7  -> 28
// node calculator.js divide 10 2   -> 5
```

---

## Exercise 5: Browser vs Node.js (20 min)

**Objective**: Understand what's available in Node.js vs Browser

Create `browser-vs-node.js`:

```javascript
// Check what's available and what's not

console.log('Testing Node.js environment...\n');

// Browser APIs that DON'T exist in Node.js
try {
  console.log('Window object:', typeof window);
} catch (error) {
  console.log('❌ window is not defined in Node.js');
}

try {
  console.log('Document object:', typeof document);
} catch (error) {
  console.log('❌ document is not defined in Node.js');
}

// Node.js specific APIs
console.log('✅ global object:', typeof global);
console.log('✅ process object:', typeof process);
console.log('✅ __dirname:', typeof __dirname);
console.log('✅ __filename:', typeof __filename);

// Common to both
console.log('✅ console:', typeof console);
console.log('✅ setTimeout:', typeof setTimeout);
console.log('✅ setInterval:', typeof setInterval);
console.log('✅ Promise:', typeof Promise);
```

**Task**: Create a table comparing Browser vs Node.js features in your notes.

---

## Exercise 6: Mini Project - Personal Info CLI (30 min)

**Objective**: Build a small CLI app that collects and displays information

Create `personal-info.js`:

```javascript
// This app should:
// 1. Accept name as command-line argument
// 2. Accept age as command-line argument
// 3. Display a formatted welcome message
// 4. Show system info
// 5. Calculate birth year based on age

// Example usage:
// node personal-info.js "John Doe" 25

// Expected output:
/*
================================
   WELCOME TO NODE.JS
================================
Name: John Doe
Age: 25
Birth Year: ~1999
--------------------------------
System Info:
- Node Version: v20.x.x
- Platform: darwin
- Running from: /path/to/script
================================
*/
```

**Requirements:**
- Handle missing arguments gracefully
- Format output nicely with console methods
- Use template literals
- Calculate birth year: `2026 - age`
- Add color to output (bonus: research chalk package)

**Bonus Challenges:**
1. Validate that age is a number
2. Add a timestamp when the script runs
3. Display execution time at the end
4. Accept a `--verbose` flag for extra info

---

## 🏆 Challenge: Mini Web Server Info (Advanced)

Create `server-info.js` that simulates server startup:

```javascript
// Display:
// - Server name
// - Environment (from NODE_ENV)
// - Port (from command-line or default to 3000)
// - Startup time
// - ASCII art logo (be creative!)

// Example:
// NODE_ENV=production node server-info.js 8080
```

Expected output:
```
╔════════════════════════════════╗
║     MY AWESOME SERVER          ║
╚════════════════════════════════╝

Environment: production
Port: 8080
Node Version: v20.x.x
Started at: 2026-01-11T10:30:00.000Z
Process ID: 12345

✅ Server ready to accept connections
```

---

## ✅ Checklist

Before moving to Day 2, ensure you can:
- [ ] Use Node.js REPL comfortably
- [ ] Create and run Node.js scripts
- [ ] Access process object properties
- [ ] Read environment variables
- [ ] Handle command-line arguments
- [ ] Understand Node.js vs Browser differences
- [ ] Use `__dirname` and `__filename`

---

## 💡 Tips

1. **Debugging**: Use `console.log()` liberally while learning
2. **Documentation**: Get comfortable reading Node.js docs
3. **Experiment**: Try breaking things to understand errors
4. **Compare**: Always relate to your frontend knowledge

---

**Next**: [Practice Project →](../practice/README.md)

**Stuck?** Check [Solutions](./solutions/) (Try yourself first!)
