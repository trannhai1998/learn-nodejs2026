# Day 4: Module System (CommonJS vs ES Modules)

## 🎯 Learning Objectives
- Understand why modules are important
- Master CommonJS (require/module.exports)
- Learn ES Modules (import/export)
- Understand module resolution and caching
- Create reusable modules
- Know when to use which module system

## 📚 Theory

### Why Modules?

Without modules, all code would be in global scope:

```javascript
// ❌ WITHOUT MODULES: Everything is global
// file1.js
var name = 'John';
function greet() { console.log('Hello'); }

// file2.js
var name = 'Jane'; // ⚠️ Overwrites name from file1!
function greet() { console.log('Hi'); } // ⚠️ Overwrites greet!

// Problems:
// - Name collisions
// - Hard to track dependencies
// - Difficult to reuse code
```

```javascript
// ✅ WITH MODULES: Encapsulated code
// file1.js
module.exports = {
  name: 'John',
  greet: function() { console.log('Hello'); }
};

// file2.js
const file1 = require('./file1');
console.log(file1.name); // 'John'
file1.greet(); // 'Hello'
```

**Benefits of Modules:**
- 📦 Code organization
- 🔒 Encapsulation (private/public)
- ♻️ Reusability
- 🔍 Easier testing
- 📚 Better maintainability

### CommonJS (Node.js default)

Used by Node.js since the beginning. Uses `require()` and `module.exports`.

**Basic Syntax:**

```javascript
// math.js - Exporting
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

module.exports = {
  add,
  subtract
};

// app.js - Importing
const math = require('./math');
console.log(math.add(5, 3)); // 8
console.log(math.subtract(5, 3)); // 2
```

**Export Patterns:**

```javascript
// Pattern 1: Object exports
module.exports = {
  add: (a, b) => a + b,
  multiply: (a, b) => a * b
};

// Pattern 2: Single function
module.exports = function(name) {
  console.log(`Hello, ${name}`);
};

// Pattern 3: Class
module.exports = class Calculator {
  add(a, b) { return a + b; }
  subtract(a, b) { return a - b; }
};

// Pattern 4: Direct assignment
exports.add = (a, b) => a + b;
exports.multiply = (a, b) => a * b;
// Note: exports is a reference to module.exports
```

**Import Patterns:**

```javascript
// Import entire module
const math = require('./math');

// Destructure on import
const { add, subtract } = require('./math');

// Import built-in module
const fs = require('fs');
const path = require('path');

// Import npm package
const express = require('express');
const axios = require('axios');
```

### ES Modules (Modern JavaScript)

Standardized by ECMAScript. Uses `import` and `export`.

**Enabling ES Modules in Node.js:**

```json
// package.json
{
  "type": "module"
}
```

Or use `.mjs` file extension.

**Basic Syntax:**

```javascript
// math.mjs - Named exports
export function add(a, b) {
  return a + b;
}

export function subtract(a, b) {
  return a - b;
}

// app.mjs - Named imports
import { add, subtract } from './math.mjs';
console.log(add(5, 3)); // 8

// OR import everything
import * as math from './math.mjs';
console.log(math.add(5, 3)); // 8
```

**Export Patterns:**

```javascript
// Pattern 1: Named exports (multiple)
export const PI = 3.14159;
export function square(x) { return x * x; }
export class Circle {
  constructor(radius) { this.radius = radius; }
}

// Pattern 2: Export at end
function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
export { add, subtract };

// Pattern 3: Default export (one per file)
export default class Calculator {
  add(a, b) { return a + b; }
}

// Pattern 4: Default + named exports
export default function greet(name) {
  return `Hello, ${name}`;
}
export const VERSION = '1.0.0';
```

**Import Patterns:**

```javascript
// Named imports
import { add, subtract, PI } from './math.mjs';

// Rename imports
import { add as sum } from './math.mjs';

// Import everything
import * as math from './math.mjs';

// Default import
import Calculator from './calculator.mjs';

// Default + named
import greet, { VERSION } from './utils.mjs';

// Import for side effects only
import './setup.mjs'; // Just runs the code

// Dynamic imports
const module = await import('./math.mjs');
module.add(2, 3);
```

### CommonJS vs ES Modules

| Feature | CommonJS | ES Modules |
|---------|----------|------------|
| **Syntax** | `require()`/`module.exports` | `import`/`export` |
| **Loading** | Synchronous | Asynchronous |
| **When loaded** | Runtime | Parse time |
| **Dynamic imports** | ✅ Always | ✅ With `import()` |
| **Tree shaking** | ❌ No | ✅ Yes |
| **Default in Node.js** | ✅ Yes | ❌ Need config |
| **Browser support** | ❌ No (needs bundler) | ✅ Yes (modern) |
| **Top-level await** | ❌ No | ✅ Yes |
| **Circular dependencies** | ✅ Handled | ⚠️ Complex |

**When to use what:**

```javascript
// ✅ Use CommonJS when:
// - Working with existing Node.js codebases
// - Need synchronous loading
// - Using older Node.js versions
// - Working with npm packages (most use CommonJS)

// ✅ Use ES Modules when:
// - Starting new projects
// - Need tree shaking (smaller bundles)
// - Want modern syntax
// - Building for modern browsers
// - Using top-level await
```

### Module Resolution

How Node.js finds modules:

```javascript
const module = require('module-name');
```

**Resolution algorithm:**

1. **Core modules** (highest priority)
   ```javascript
   require('fs'); // ✅ Built-in fs module
   ```

2. **Relative paths**
   ```javascript
   require('./math'); // ./math.js or ./math.json or ./math/index.js
   require('../utils/helper'); // Up one directory
   ```

3. **Node modules** (searches up directory tree)
   ```javascript
   require('express');
   // Searches:
   // ./node_modules/express
   // ../node_modules/express
   // ../../node_modules/express
   // etc.
   ```

**File resolution order:**
```
require('./math')
↓
1. ./math.js
2. ./math.json
3. ./math.node (C++ addon)
4. ./math/index.js
5. ./math/package.json (check "main" field)
```

### Module Caching

Modules are cached after first load:

```javascript
// counter.js
let count = 0;
module.exports = {
  increment() { count++; },
  getCount() { return count; }
};

// app.js
const counter1 = require('./counter');
const counter2 = require('./counter');

counter1.increment();
console.log(counter1.getCount()); // 1
console.log(counter2.getCount()); // 1 (same instance!)

// They share the same cache:
console.log(counter1 === counter2); // true
```

**Cache location:**
```javascript
console.log(require.cache);
// Shows all cached modules

// Clear cache (rarely needed)
delete require.cache[require.resolve('./counter')];
```

## 🔗 Frontend Developer Perspective

**Frontend (Before):**
```html
<!-- Old way: Script tags -->
<script src="jquery.js"></script>
<script src="lodash.js"></script>
<script src="app.js"></script>
<!-- Order matters! Risk of global pollution -->
```

**Frontend (Modern):**
```javascript
// ES Modules in browser
import { render } from './react.js';
import { fetchData } from './api.js';
// Clean, explicit dependencies
```

**Backend (Node.js):**
```javascript
// Same concept, different syntax
const express = require('express');
const { fetchData } = require('./api');
// Or with ES modules:
import express from 'express';
import { fetchData } from './api.mjs';
```

**The flow you're used to:**
```
Frontend Component:
import { useState } from 'react';
import { fetchUsers } from './api'; // ← YOUR MODULE

function UserList() {
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    fetchUsers().then(setUsers);
  }, []);
}

Backend Module:
export async function fetchUsers() {
  const response = await fetch('/api/users');
  return response.json();
}

Backend API (Node.js):
import express from 'express';
import { getUsers } from './database.mjs'; // ← YOUR MODULE

app.get('/api/users', async (req, res) => {
  const users = await getUsers();
  res.json(users);
});
```

## 💻 Practical Examples

### Example 1: Creating a Utility Module

```javascript
// utils/math.js (CommonJS)
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => {
  if (b === 0) throw new Error('Division by zero');
  return a / b;
};

module.exports = {
  add,
  subtract,
  multiply,
  divide
};

// app.js
const math = require('./utils/math');
console.log(math.add(10, 5)); // 15
console.log(math.multiply(3, 4)); // 12
```

### Example 2: Config Module

```javascript
// config/database.js
const config = {
  development: {
    host: 'localhost',
    port: 5432,
    database: 'dev_db'
  },
  production: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME
  }
};

const env = process.env.NODE_ENV || 'development';
module.exports = config[env];

// app.js
const dbConfig = require('./config/database');
console.log(`Connecting to ${dbConfig.host}:${dbConfig.port}`);
```

### Example 3: Class Module

```javascript
// models/User.js
class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
    this.createdAt = new Date();
  }
  
  getInfo() {
    return `${this.name} (${this.email})`;
  }
  
  static create(name, email) {
    // Validation
    if (!name || !email) {
      throw new Error('Name and email required');
    }
    return new User(name, email);
  }
}

module.exports = User;

// app.js
const User = require('./models/User');
const user = User.create('John', 'john@example.com');
console.log(user.getInfo());
```

### Example 4: ES Modules

```javascript
// utils/logger.mjs
export const LOG_LEVELS = {
  INFO: 'info',
  WARN: 'warn',
  ERROR: 'error'
};

export function log(level, message) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] [${level}] ${message}`);
}

export default class Logger {
  constructor(prefix) {
    this.prefix = prefix;
  }
  
  info(message) {
    log(LOG_LEVELS.INFO, `${this.prefix}: ${message}`);
  }
  
  error(message) {
    log(LOG_LEVELS.ERROR, `${this.prefix}: ${message}`);
  }
}

// app.mjs
import Logger, { LOG_LEVELS, log } from './utils/logger.mjs';

const logger = new Logger('App');
logger.info('Application started');
log(LOG_LEVELS.WARN, 'This is a warning');
```

### Example 5: Module Structure

```
project/
├── src/
│   ├── utils/
│   │   ├── index.js         # Export all utilities
│   │   ├── string.js
│   │   ├── number.js
│   │   └── date.js
│   ├── models/
│   │   ├── User.js
│   │   └── Product.js
│   ├── services/
│   │   ├── api.js
│   │   └── database.js
│   └── config/
│       ├── index.js
│       └── constants.js
└── app.js
```

```javascript
// utils/index.js - Barrel export
module.exports = {
  ...require('./string'),
  ...require('./number'),
  ...require('./date')
};

// app.js - Clean imports
const utils = require('./src/utils');
utils.capitalize('hello');
utils.formatDate(new Date());
```

## 🎯 Key Takeaways

1. **Modules** encapsulate code and prevent global pollution
2. **CommonJS** uses `require()`/`module.exports` (Node.js default)
3. **ES Modules** use `import`/`export` (JavaScript standard)
4. Modules are **cached** after first load
5. Use **relative paths** (./) or **package names**
6. **Default exports** vs **named exports**

## 📝 Best Practices

```javascript
// ✅ DO: Use descriptive names
const userService = require('./services/user');
const { createUser, deleteUser } = require('./services/user');

// ❌ DON'T: Use vague names
const us = require('./services/user');

// ✅ DO: Group related functionality
// auth/index.js
module.exports = {
  login: require('./login'),
  logout: require('./logout'),
  verify: require('./verify')
};

// ✅ DO: Use index.js for clean imports
// services/index.js
exports.userService = require('./userService');
exports.productService = require('./productService');

// app.js
const { userService } = require('./services');

// ✅ DO: Check for module existence
try {
  const optional = require('./optional-module');
} catch (err) {
  console.log('Optional module not found');
}
```

## 📚 Resources

- [Node.js Modules Documentation](https://nodejs.org/api/modules.html)
- [ES Modules in Node.js](https://nodejs.org/api/esm.html)
- [Understanding Module Systems](https://www.freecodecamp.org/news/javascript-modules-a-beginner-s-guide-783f7d7a5fcc/)

---

**Next**: [Exercises →](./exercises/README.md)
