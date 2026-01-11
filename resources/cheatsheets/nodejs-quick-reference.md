# Node.js Cheat Sheet - Quick Reference

## 🚀 Common Commands

### NPM Commands
```bash
# Initialize project
npm init
npm init -y

# Install packages
npm install package-name
npm install -D package-name  # Dev dependency
npm install -g package-name  # Global

# Run scripts
npm start
npm test
npm run dev

# Update packages
npm update
npm outdated

# Remove packages
npm uninstall package-name
```

### Node Commands
```bash
# Run file
node app.js

# REPL
node

# With flags
node --version
node --inspect app.js        # Debug mode
node --watch app.js          # Watch mode (Node 18+)
node --max-old-space-size=4096 app.js  # Increase heap

# Environment
NODE_ENV=production node app.js
```

## 📦 Module Patterns

### CommonJS
```javascript
// Export
module.exports = function() {}
module.exports = { func1, func2 }
exports.func = function() {}

// Import
const module = require('./module')
const { func } = require('./module')
```

### ES Modules
```javascript
// Export
export default function() {}
export const func = () => {}
export { func1, func2 }

// Import
import module from './module.js'
import { func } from './module.js'
import * as module from './module.js'
```

## 🔄 Async Patterns

### Callbacks
```javascript
fs.readFile('file.txt', (err, data) => {
  if (err) throw err;
  console.log(data);
});
```

### Promises
```javascript
fs.promises.readFile('file.txt')
  .then(data => console.log(data))
  .catch(err => console.error(err));
```

### Async/Await
```javascript
async function readFile() {
  try {
    const data = await fs.promises.readFile('file.txt');
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}
```

## 📁 File System

```javascript
const fs = require('fs').promises;

// Read
await fs.readFile('file.txt', 'utf8')

// Write
await fs.writeFile('file.txt', 'content')

// Append
await fs.appendFile('file.txt', 'more content')

// Delete
await fs.unlink('file.txt')

// Directory
await fs.mkdir('folder', { recursive: true })
await fs.readdir('folder')
await fs.rm('folder', { recursive: true })

// Stats
const stats = await fs.stat('file.txt')
stats.isFile()
stats.isDirectory()
stats.size
```

## 🌐 HTTP Server

### Basic Server
```javascript
const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World');
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

### Express Server
```javascript
const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Hello' });
});

app.post('/users', (req, res) => {
  res.status(201).json(req.body);
});

app.listen(3000);
```

## 🔐 Environment Variables

```javascript
// .env file
PORT=3000
DB_URL=mongodb://localhost/mydb

// Access
require('dotenv').config();
const port = process.env.PORT || 3000;
const dbUrl = process.env.DB_URL;
```

## 🗃️ Database Connections

### MongoDB
```javascript
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('Connected'))
  .catch(err => console.error(err));

const schema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true }
});

const User = mongoose.model('User', schema);
```

### PostgreSQL with Prisma
```javascript
// schema.prisma
model User {
  id    Int     @id @default(autoincrement())
  email String  @unique
  name  String?
}

// usage
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const user = await prisma.user.create({
  data: { email: 'test@test.com', name: 'Test' }
});
```

## 🔒 Authentication

### JWT
```javascript
const jwt = require('jsonwebtoken');

// Generate
const token = jwt.sign(
  { userId: user.id },
  process.env.JWT_SECRET,
  { expiresIn: '7d' }
);

// Verify
const decoded = jwt.verify(token, process.env.JWT_SECRET);
```

### Bcrypt
```javascript
const bcrypt = require('bcrypt');

// Hash
const hash = await bcrypt.hash(password, 10);

// Compare
const isValid = await bcrypt.compare(password, hash);
```

## 🧪 Testing with Jest

```javascript
// sum.test.js
const sum = require('./sum');

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});

// API test with supertest
const request = require('supertest');
const app = require('./app');

test('GET /users', async () => {
  const res = await request(app).get('/users');
  expect(res.statusCode).toBe(200);
  expect(res.body).toHaveProperty('users');
});
```

## ⚡ Common Middleware

```javascript
const express = require('express');
const app = express();

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS
const cors = require('cors');
app.use(cors());

// Logging
const morgan = require('morgan');
app.use(morgan('dev'));

// Static files
app.use(express.static('public'));

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});
```

## 🔌 WebSockets

```javascript
const io = require('socket.io')(server);

io.on('connection', (socket) => {
  console.log('User connected');
  
  socket.on('message', (data) => {
    io.emit('message', data);
  });
  
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});
```

## 📊 Process & Events

```javascript
// Process
console.log(process.env);
console.log(process.argv);
console.log(process.cwd());
process.exit(0);

// Events
const EventEmitter = require('events');
const emitter = new EventEmitter();

emitter.on('event', (data) => {
  console.log('Event fired:', data);
});

emitter.emit('event', { data: 'test' });
```

## 🛠️ Useful Utilities

```javascript
// Path
const path = require('path');
path.join(__dirname, 'file.txt')
path.resolve('file.txt')
path.basename('/path/to/file.txt')
path.dirname('/path/to/file.txt')
path.extname('file.txt')

// URL
const url = new URL('http://example.com/path?key=value');
url.hostname  // 'example.com'
url.pathname  // '/path'
url.search    // '?key=value'

// Crypto
const crypto = require('crypto');
crypto.randomBytes(16).toString('hex')
crypto.createHash('sha256').update('data').digest('hex')
```

## 🚨 Error Handling

```javascript
// Try-Catch
try {
  await someAsyncFunction();
} catch (err) {
  console.error('Error:', err.message);
  throw err;
}

// Custom Error
class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

throw new CustomError('Not found', 404);

// Express Error Handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    error: {
      message: err.message,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    }
  });
});
```

## 📝 Best Practices

```javascript
// ✅ Use environment variables
const PORT = process.env.PORT || 3000;

// ✅ Use async/await
async function getData() {
  const data = await fetchData();
  return data;
}

// ✅ Handle errors
process.on('unhandledRejection', (err) => {
  console.error('Unhandled rejection:', err);
  process.exit(1);
});

// ✅ Use middleware
app.use(express.json());
app.use(cors());

// ✅ Validate input
const { body, validationResult } = require('express-validator');

app.post('/user', [
  body('email').isEmail(),
  body('name').notEmpty()
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // Process request
});
```

---

**Print this for quick reference! 📄**
