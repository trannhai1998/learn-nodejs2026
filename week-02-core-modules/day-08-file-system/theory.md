# Day 8: File System Module

## 🎯 Learning Objectives
- Master file system operations in Node.js
- Understand sync vs async file operations
- Read and write files efficiently
- Work with directories
- Handle file metadata and permissions
- Implement file watching

## 📚 Theory

### Introduction to File System (fs) Module

The `fs` module provides an API for interacting with the file system. It's one of the most commonly used built-in modules.

```javascript
const fs = require('fs');
// Or with promises
const fs = require('fs').promises;
// Or ES modules
import fs from 'fs/promises';
```

### Synchronous vs Asynchronous Operations

```javascript
// ❌ SYNCHRONOUS (Blocking)
const data = fs.readFileSync('file.txt', 'utf8');
console.log(data);
// Next line waits for file read to complete

// ✅ ASYNCHRONOUS (Non-blocking - Callback)
fs.readFile('file.txt', 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data);
});
// Next line runs immediately

// ✅ ASYNCHRONOUS (Non-blocking - Promises)
const data = await fs.promises.readFile('file.txt', 'utf8');
console.log(data);
```

**When to use which:**
```javascript
// ✅ Use SYNC only for:
// - App initialization
// - Loading config files at startup
// - CLI tools with no concurrent operations

// ✅ Use ASYNC for:
// - Web servers
// - API handlers
// - Anything with concurrent users
// - Production applications
```

## 💻 Reading Files

### Method 1: readFile (Load entire file)

```javascript
const fs = require('fs').promises;

// Read text file
async function readTextFile() {
  try {
    const data = await fs.readFile('example.txt', 'utf8');
    console.log(data);
  } catch (err) {
    console.error('Error reading file:', err);
  }
}

// Read JSON file
async function readJSONFile() {
  try {
    const data = await fs.readFile('data.json', 'utf8');
    const json = JSON.parse(data);
    console.log(json);
  } catch (err) {
    console.error('Error reading JSON:', err);
  }
}

// Read binary file
async function readBinaryFile() {
  try {
    const buffer = await fs.readFile('image.png');
    console.log('Buffer size:', buffer.length);
  } catch (err) {
    console.error('Error reading binary:', err);
  }
}
```

### Method 2: createReadStream (For large files)

```javascript
const fs = require('fs');

// Read large file in chunks
function readLargeFile() {
  const stream = fs.createReadStream('large-file.txt', {
    encoding: 'utf8',
    highWaterMark: 64 * 1024 // 64KB chunks
  });

  stream.on('data', (chunk) => {
    console.log('Received chunk:', chunk.length);
  });

  stream.on('end', () => {
    console.log('Finished reading file');
  });

  stream.on('error', (err) => {
    console.error('Error:', err);
  });
}
```

## 💻 Writing Files

### Method 1: writeFile (Overwrite)

```javascript
const fs = require('fs').promises;

// Write string
async function writeTextFile() {
  try {
    await fs.writeFile('output.txt', 'Hello World!', 'utf8');
    console.log('File written successfully');
  } catch (err) {
    console.error('Error writing file:', err);
  }
}

// Write JSON
async function writeJSONFile() {
  const data = { name: 'John', age: 30 };
  try {
    await fs.writeFile('data.json', JSON.stringify(data, null, 2));
    console.log('JSON written successfully');
  } catch (err) {
    console.error('Error writing JSON:', err);
  }
}

// Write buffer
async function writeBinaryFile() {
  const buffer = Buffer.from([0x48, 0x65, 0x6c, 0x6c, 0x6f]);
  try {
    await fs.writeFile('binary.dat', buffer);
    console.log('Binary written successfully');
  } catch (err) {
    console.error('Error writing binary:', err);
  }
}
```

### Method 2: appendFile (Append to existing)

```javascript
async function appendToFile() {
  try {
    await fs.appendFile('log.txt', 'New log entry\n');
    console.log('Data appended');
  } catch (err) {
    console.error('Error appending:', err);
  }
}

// Append with timestamp
async function appendLog(message) {
  const timestamp = new Date().toISOString();
  const logEntry = `[${timestamp}] ${message}\n`;
  await fs.appendFile('app.log', logEntry);
}
```

### Method 3: createWriteStream (For large data)

```javascript
const fs = require('fs');

function writeLargeFile() {
  const stream = fs.createWriteStream('large-output.txt');
  
  for (let i = 0; i < 1000000; i++) {
    stream.write(`Line ${i}\n`);
  }
  
  stream.end();
  stream.on('finish', () => {
    console.log('Finished writing file');
  });
}
```

## 💻 Working with Directories

### Creating Directories

```javascript
const fs = require('fs').promises;
const path = require('path');

// Create single directory
async function createDir() {
  try {
    await fs.mkdir('new-folder');
    console.log('Directory created');
  } catch (err) {
    if (err.code === 'EEXIST') {
      console.log('Directory already exists');
    } else {
      throw err;
    }
  }
}

// Create nested directories
async function createNestedDirs() {
  try {
    await fs.mkdir('path/to/nested/folder', { recursive: true });
    console.log('Nested directories created');
  } catch (err) {
    console.error('Error:', err);
  }
}
```

### Reading Directories

```javascript
// List files in directory
async function listFiles(dirPath) {
  try {
    const files = await fs.readdir(dirPath);
    console.log('Files:', files);
    return files;
  } catch (err) {
    console.error('Error reading directory:', err);
  }
}

// List with file details
async function listFilesDetailed(dirPath) {
  try {
    const files = await fs.readdir(dirPath, { withFileTypes: true });
    
    for (const file of files) {
      if (file.isDirectory()) {
        console.log(`📁 ${file.name}`);
      } else if (file.isFile()) {
        console.log(`📄 ${file.name}`);
      }
    }
  } catch (err) {
    console.error('Error:', err);
  }
}

// Recursive directory listing
async function listFilesRecursive(dirPath, indent = '') {
  const files = await fs.readdir(dirPath, { withFileTypes: true });
  
  for (const file of files) {
    const fullPath = path.join(dirPath, file.name);
    
    if (file.isDirectory()) {
      console.log(`${indent}📁 ${file.name}/`);
      await listFilesRecursive(fullPath, indent + '  ');
    } else {
      console.log(`${indent}📄 ${file.name}`);
    }
  }
}
```

### Deleting Directories

```javascript
// Remove empty directory
async function removeDir() {
  try {
    await fs.rmdir('folder-to-delete');
    console.log('Directory removed');
  } catch (err) {
    console.error('Error:', err);
  }
}

// Remove directory recursively (with contents)
async function removeDirRecursive() {
  try {
    await fs.rm('folder-to-delete', { recursive: true, force: true });
    console.log('Directory and contents removed');
  } catch (err) {
    console.error('Error:', err);
  }
}
```

## 💻 File Metadata

### Getting File Stats

```javascript
async function getFileInfo(filePath) {
  try {
    const stats = await fs.stat(filePath);
    
    console.log('File Information:');
    console.log('Size:', stats.size, 'bytes');
    console.log('Created:', stats.birthtime);
    console.log('Modified:', stats.mtime);
    console.log('Is File:', stats.isFile());
    console.log('Is Directory:', stats.isDirectory());
    
    return stats;
  } catch (err) {
    console.error('Error getting stats:', err);
  }
}

// Check if file exists
async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

// Get file size in human-readable format
function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}
```

## 💻 File Operations

### Copying Files

```javascript
// Copy file
async function copyFile(source, destination) {
  try {
    await fs.copyFile(source, destination);
    console.log('File copied successfully');
  } catch (err) {
    console.error('Error copying file:', err);
  }
}

// Copy with check
async function copyFileIfNotExists(source, destination) {
  try {
    await fs.copyFile(source, destination, fs.constants.COPYFILE_EXCL);
    console.log('File copied');
  } catch (err) {
    if (err.code === 'EEXIST') {
      console.log('File already exists');
    } else {
      throw err;
    }
  }
}
```

### Renaming/Moving Files

```javascript
async function renameFile(oldPath, newPath) {
  try {
    await fs.rename(oldPath, newPath);
    console.log('File renamed successfully');
  } catch (err) {
    console.error('Error renaming file:', err);
  }
}
```

### Deleting Files

```javascript
async function deleteFile(filePath) {
  try {
    await fs.unlink(filePath);
    console.log('File deleted successfully');
  } catch (err) {
    console.error('Error deleting file:', err);
  }
}

// Delete with check
async function deleteFileIfExists(filePath) {
  try {
    if (await fileExists(filePath)) {
      await fs.unlink(filePath);
      console.log('File deleted');
    } else {
      console.log('File does not exist');
    }
  } catch (err) {
    console.error('Error:', err);
  }
}
```

## 💻 Watching Files

```javascript
const fs = require('fs');

// Watch file for changes
function watchFile(filePath) {
  fs.watch(filePath, (eventType, filename) => {
    console.log(`File ${filename} changed: ${eventType}`);
    // eventType: 'rename' or 'change'
  });
}

// Watch directory
function watchDirectory(dirPath) {
  fs.watch(dirPath, { recursive: true }, (eventType, filename) => {
    console.log(`File ${filename} ${eventType}`);
  });
}

// More reliable file watching with fs.watchFile
function watchFilePolling(filePath) {
  fs.watchFile(filePath, { interval: 1000 }, (curr, prev) => {
    if (curr.mtime !== prev.mtime) {
      console.log('File was modified');
    }
  });
}
```

## 🔗 Frontend Developer Perspective

**Frontend: File input handling**
```javascript
// Frontend: User uploads file
<input type="file" onChange={handleFileUpload} />

function handleFileUpload(event) {
  const file = event.target.files[0];
  const formData = new FormData();
  formData.append('file', file);
  
  fetch('/api/upload', {
    method: 'POST',
    body: formData
  });
}
```

**Backend: Receiving and saving file**
```javascript
// Backend: Save uploaded file
const express = require('express');
const multer = require('multer');
const fs = require('fs').promises;

const upload = multer({ dest: 'uploads/' });

app.post('/api/upload', upload.single('file'), async (req, res) => {
  try {
    const tempPath = req.file.path;
    const targetPath = `files/${req.file.originalname}`;
    
    await fs.rename(tempPath, targetPath);
    res.json({ message: 'File uploaded successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
```

## 🎯 Key Takeaways

1. **Always use async** operations in production (except app initialization)
2. **Use streams** for large files to avoid memory issues
3. **Handle errors** properly with try/catch
4. **Check existence** before operations when necessary
5. **Use path.join()** for cross-platform paths
6. **Never block** the event loop with sync operations

## 📝 Best Practices

```javascript
// ✅ DO: Use async/await
async function readFile() {
  const data = await fs.promises.readFile('file.txt', 'utf8');
  return data;
}

// ❌ DON'T: Use sync in production
function readFileSync() {
  return fs.readFileSync('file.txt', 'utf8'); // Blocks!
}

// ✅ DO: Handle errors
async function safeRead(path) {
  try {
    return await fs.promises.readFile(path, 'utf8');
  } catch (err) {
    console.error('Failed to read file:', err.message);
    return null;
  }
}

// ✅ DO: Use streams for large files
function processLargeFile() {
  const readStream = fs.createReadStream('large.txt');
  const writeStream = fs.createWriteStream('output.txt');
  readStream.pipe(writeStream);
}

// ❌ DON'T: Load large files into memory
async function badLargeFile() {
  const data = await fs.promises.readFile('100gb.txt'); // Out of memory!
}
```

## 📚 Resources

- [Node.js fs Documentation](https://nodejs.org/api/fs.html)
- [File System Best Practices](https://nodejs.dev/learn/working-with-file-descriptors-in-nodejs)

---

**Next**: [Exercises →](./exercises/README.md)
