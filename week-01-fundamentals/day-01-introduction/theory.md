# Day 1: Introduction to Node.js & Runtime Environment

## 🎯 Learning Objectives
- Understand what Node.js is and why it exists
- Learn about the Node.js runtime architecture
- Differentiate between Browser JavaScript and Node.js
- Set up your development environment
- Write your first Node.js program

## 📚 Theory

### What is Node.js?

**Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine.**

Think of it this way:
- **Browser**: JavaScript runs in the browser to manipulate DOM, handle events, make UI interactive
- **Node.js**: JavaScript runs on the server to handle file systems, databases, network requests

```
┌─────────────────────────────────────────────────┐
│              JavaScript Language                 │
├─────────────────────────────────────────────────┤
│                                                  │
│  Browser (Chrome)          Node.js (Server)     │
│  ├── V8 Engine             ├── V8 Engine        │
│  ├── DOM APIs              ├── File System      │
│  ├── Window Object         ├── HTTP Module      │
│  ├── Fetch API             ├── Process          │
│  └── localStorage          └── Buffer           │
│                                                  │
└─────────────────────────────────────────────────┘
```

### Why Node.js?

1. **Same Language**: Use JavaScript for both frontend and backend
2. **Non-blocking I/O**: Handle many connections simultaneously
3. **Fast**: Built on V8 engine (compiles JS to machine code)
4. **NPM Ecosystem**: Largest package registry in the world
5. **Active Community**: Strong support and continuous development

### The Node.js Architecture

```
┌───────────────────────────────────────────────────┐
│            Your JavaScript Code                    │
├───────────────────────────────────────────────────┤
│                  Node.js APIs                      │
│  (fs, http, path, crypto, events, streams, etc.)  │
├───────────────────────────────────────────────────┤
│              Node.js Bindings (C++)                │
├───────────────────────────────────────────────────┤
│        V8 Engine          libuv (Event Loop)      │
│    (JavaScript Runtime)   (Async I/O)             │
└───────────────────────────────────────────────────┘
```

**Key Components:**

1. **V8 Engine**: Compiles and executes JavaScript code
2. **libuv**: Provides the event loop and async I/O operations
3. **Node.js Core**: C++ bindings connecting JavaScript to low-level operations
4. **Node.js APIs**: Built-in modules (fs, http, path, etc.)

### Browser vs Node.js

| Feature | Browser | Node.js |
|---------|---------|---------|
| **Global Object** | `window` | `global` |
| **DOM** | ✅ Available | ❌ Not available |
| **File System** | ❌ Limited (File API) | ✅ Full access |
| **Network** | Fetch API, XMLHttpRequest | HTTP/HTTPS modules |
| **Module System** | ES Modules | CommonJS + ES Modules |
| **Use Case** | User Interface | Server, CLI, Build tools |

### Common Use Cases for Node.js

1. **RESTful APIs**: Backend for your React/Vue/Angular apps
2. **Real-time Applications**: Chat apps, live notifications, collaborative tools
3. **Microservices**: Scalable service architecture
4. **Build Tools**: Webpack, Vite, Babel
5. **CLI Tools**: Command-line utilities
6. **Server-Side Rendering**: Next.js, Nuxt.js
7. **IoT Applications**: Lightweight server for devices

## 🔗 Frontend Developer Perspective

As a frontend developer, you already know:
```javascript
// Frontend: Making API calls
fetch('https://api.example.com/users')
  .then(res => res.json())
  .then(data => console.log(data));
```

With Node.js, you'll build **the server that responds** to this request:
```javascript
// Backend: Creating the API endpoint
const express = require('express');
const app = express();

app.get('/users', (req, res) => {
  res.json([
    { id: 1, name: 'John' },
    { id: 2, name: 'Jane' }
  ]);
});

app.listen(3000);
```

**The Complete Flow:**
```
┌──────────────┐    HTTP Request     ┌──────────────┐
│   Frontend   │ ─────────────────> │   Node.js    │
│ (React/Vue)  │                     │   Backend    │
│              │ <───────────────── │              │
└──────────────┘   JSON Response    └──────────────┘
                                           │
                                           │ Query
                                           ▼
                                    ┌──────────────┐
                                    │   Database   │
                                    └──────────────┘
```

## 🛠️ Setup Development Environment

### 1. Install Node.js

**Check if already installed:**
```bash
node --version
npm --version
```

**Install Node.js v20+ (LTS):**
- Visit: https://nodejs.org/
- Or use nvm (Node Version Manager):
```bash
# macOS/Linux
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 20
nvm use 20
```

### 2. Install a Code Editor
- **VS Code** (Recommended): https://code.visualstudio.com/
- Install extensions:
  - Node.js Extension Pack
  - ESLint
  - Prettier

### 3. Verify Installation
```bash
node --version    # Should show v20.x.x
npm --version     # Should show v10.x.x
```

## 💻 Your First Node.js Program

### Using REPL (Read-Eval-Print Loop)

```bash
node
```

Try these commands:
```javascript
> console.log('Hello Node.js!')
> const sum = (a, b) => a + b
> sum(5, 3)
> .exit
```

### Creating a Script File

Create `hello.js`:
```javascript
// hello.js
console.log('Hello from Node.js!');

const name = 'Frontend Developer';
console.log(`Welcome to Node.js, ${name}!`);

// Node.js specific - won't work in browser
console.log('Current directory:', __dirname);
console.log('Current file:', __filename);
```

**Run it:**
```bash
node hello.js
```

### Understanding Global Objects

```javascript
// global-objects.js

// Console (same as browser)
console.log('Regular log');
console.error('Error message');
console.table({ name: 'John', age: 30 });

// Process (Node.js specific)
console.log('Node version:', process.version);
console.log('Platform:', process.platform);
console.log('Current directory:', process.cwd());

// Environment variables
console.log('Environment:', process.env.NODE_ENV);

// __dirname and __filename (Node.js specific)
console.log('Directory:', __dirname);
console.log('File:', __filename);
```

## 🎯 Key Takeaways

1. Node.js runs JavaScript **outside the browser** (on servers, CLI, etc.)
2. It's built on **V8 engine** (fast) + **libuv** (async I/O)
3. No DOM, but has **File System, HTTP, and other server APIs**
4. Uses **CommonJS** modules by default (also supports ES Modules)
5. Perfect for building **APIs that your frontend consumes**

## 📝 Interview Questions

1. **What is Node.js?**
   - JavaScript runtime built on Chrome's V8 engine for server-side development

2. **Is Node.js a programming language?**
   - No, it's a runtime environment for JavaScript

3. **What makes Node.js different from browser JavaScript?**
   - No DOM APIs, has file system and network APIs, different global object

4. **What is V8?**
   - Google's JavaScript engine that compiles JS to machine code

5. **When should you use Node.js?**
   - APIs, real-time apps, microservices, I/O-heavy applications

## 🔗 Resources

- [Official Node.js Docs](https://nodejs.org/docs)
- [Node.js Introduction - MDN](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Node_server_without_framework)
- [What is Node.js? - freeCodeCamp](https://www.freecodecamp.org/news/what-is-node-js/)

## ✅ Self-Check

Before moving to exercises:
- [ ] Can you explain what Node.js is?
- [ ] Do you understand the difference between browser JS and Node.js?
- [ ] Have you successfully run a Node.js script?
- [ ] Do you understand `__dirname` and `__filename`?

---

**Next**: [Exercises →](./exercises/README.md)
