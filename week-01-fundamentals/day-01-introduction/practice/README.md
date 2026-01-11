# Day 1: Practice Project

## 🎯 Project: Node.js Environment Inspector

Build a comprehensive CLI tool that inspects and reports Node.js environment details. This tool will be useful throughout your Node.js journey.

---

## 📋 Project Requirements

Create a file called `env-inspector.js` that:

1. **System Information**
   - Node.js version
   - V8 engine version
   - Operating system and platform
   - CPU architecture
   - Total memory and free memory

2. **Process Information**
   - Process ID (PID)
   - Parent Process ID (PPID)
   - Current working directory
   - Script execution path
   - Uptime since script started

3. **Environment Details**
   - Current NODE_ENV
   - All environment variables (with option to show/hide)
   - Command-line arguments passed

4. **Features**
   - Formatted output with sections
   - Color coding (optional but recommended)
   - Support for flags: `--verbose`, `--json`
   - Export report to file option

---

## 🏗️ Project Structure

```
day-01-introduction/
└── practice/
    ├── README.md (this file)
    ├── env-inspector.js (your main file)
    ├── reports/ (generated reports will go here)
    └── package.json (optional)
```

---

## 📝 Implementation Guide

### Step 1: Basic Structure

```javascript
// env-inspector.js

// Parse command-line arguments
const args = process.argv.slice(2);
const flags = {
  verbose: args.includes('--verbose'),
  json: args.includes('--json'),
  save: args.includes('--save')
};

// Create the inspector object
const inspector = {
  system: {},
  process: {},
  environment: {}
};

// TODO: Implement data collection
// TODO: Implement display functions
// TODO: Implement export functions
```

### Step 2: Collect System Information

```javascript
function getSystemInfo() {
  return {
    nodeVersion: process.version,
    v8Version: process.versions.v8,
    platform: process.platform,
    architecture: process.arch,
    osType: process.env.OS || 'Unix-like',
    totalMemory: // TODO: Get from process.memoryUsage()
    freeMemory: // TODO: Calculate free memory
  };
}
```

### Step 3: Collect Process Information

```javascript
function getProcessInfo() {
  return {
    pid: process.pid,
    ppid: process.ppid,
    cwd: process.cwd(),
    execPath: process.execPath,
    scriptPath: __filename,
    uptime: process.uptime(),
    // TODO: Add more process details
  };
}
```

### Step 4: Display Functions

```javascript
function displayReport(data, format = 'text') {
  if (format === 'json') {
    console.log(JSON.stringify(data, null, 2));
    return;
  }
  
  // Text format
  console.log('\n╔════════════════════════════════════════╗');
  console.log('║   NODE.JS ENVIRONMENT INSPECTOR        ║');
  console.log('╚════════════════════════════════════════╝\n');
  
  // TODO: Display system info
  // TODO: Display process info
  // TODO: Display environment info
}
```

### Step 5: Main Execution

```javascript
function main() {
  console.clear(); // Clear terminal
  
  // Collect data
  inspector.system = getSystemInfo();
  inspector.process = getProcessInfo();
  inspector.environment = getEnvironmentInfo();
  
  // Display report
  const format = flags.json ? 'json' : 'text';
  displayReport(inspector, format);
  
  // Save if requested
  if (flags.save) {
    saveReport(inspector);
  }
}

// Run the inspector
main();
```

---

## 💻 Example Output

### Normal Mode:
```
╔════════════════════════════════════════╗
║   NODE.JS ENVIRONMENT INSPECTOR        ║
╚════════════════════════════════════════╝

📊 SYSTEM INFORMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Node Version:    v20.11.0
V8 Version:      11.3.244.8
Platform:        darwin
Architecture:    x64
Memory Usage:    45.2 MB / 2048 MB

⚙️  PROCESS INFORMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Process ID:      12345
Current Dir:     /Users/jamestran/...
Uptime:          0.234s

🌍 ENVIRONMENT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
NODE_ENV:        development
Arguments:       --verbose

✅ Inspection complete!
```

### JSON Mode (`--json`):
```json
{
  "system": {
    "nodeVersion": "v20.11.0",
    "v8Version": "11.3.244.8",
    "platform": "darwin",
    "architecture": "x64"
  },
  "process": {
    "pid": 12345,
    "cwd": "/Users/jamestran/...",
    "uptime": 0.234
  },
  "environment": {
    "NODE_ENV": "development"
  }
}
```

---

## 🎯 Features to Implement

### Core Features (Must Have)
- [x] Display Node.js and V8 versions
- [x] Show system platform and architecture
- [x] Display memory usage
- [x] Show process ID and current directory
- [x] List command-line arguments
- [x] Format output nicely

### Enhanced Features (Should Have)
- [ ] `--verbose` flag for detailed info
- [ ] `--json` flag for JSON output
- [ ] `--save` flag to export report
- [ ] Color-coded sections
- [ ] Memory usage in human-readable format (MB, GB)
- [ ] Process uptime in readable format

### Advanced Features (Nice to Have)
- [ ] Compare with previous reports
- [ ] Show environment variable count
- [ ] Display installed Node.js modules in current directory
- [ ] Add a `--watch` mode that refreshes every second
- [ ] Create ASCII art graphs for memory usage
- [ ] Add export formats: JSON, CSV, Markdown

---

## 🎨 Bonus: Add Colors (Optional)

Without external packages, you can use ANSI colors:

```javascript
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

function colorize(text, color) {
  return `${colors[color]}${text}${colors.reset}`;
}

// Usage:
console.log(colorize('✅ Success!', 'green'));
console.log(colorize('⚠️  Warning!', 'yellow'));
```

Or install `chalk` package:
```bash
npm init -y
npm install chalk
```

---

## 🧪 Testing Your Inspector

Test with different commands:

```bash
# Basic usage
node env-inspector.js

# Verbose mode
node env-inspector.js --verbose

# JSON output
node env-inspector.js --json

# Save report
node env-inspector.js --save

# Multiple flags
node env-inspector.js --verbose --json --save

# With custom arguments
node env-inspector.js arg1 arg2 --verbose
```

---

## 🏆 Success Criteria

Your project is complete when:
- [ ] It runs without errors
- [ ] Displays system information correctly
- [ ] Shows process details accurately
- [ ] Handles command-line flags properly
- [ ] Output is well-formatted and readable
- [ ] Code is organized and commented
- [ ] You understand every line you wrote

---

## 💡 Hints & Tips

1. **Memory Formatting**:
```javascript
function formatBytes(bytes) {
  const mb = bytes / 1024 / 1024;
  return `${mb.toFixed(2)} MB`;
}
```

2. **Time Formatting**:
```javascript
function formatUptime(seconds) {
  if (seconds < 60) return `${seconds.toFixed(3)}s`;
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}m ${secs}s`;
}
```

3. **Saving Reports**:
```javascript
const fs = require('fs');
const report = JSON.stringify(data, null, 2);
fs.writeFileSync('./reports/report.json', report);
```

---

## 🔗 Connection to Frontend

As a frontend developer, think of this like:

**Frontend Debugging Tools (Browser DevTools)**
```
Console → Performance → Network → Application
```

**Backend Debugging (Your Inspector)**
```
System Info → Process Info → Environment → Performance
```

Just like you use browser DevTools to inspect frontend performance and state, this tool helps you inspect Node.js environment!

---

## 📚 Concepts Practiced

- ✅ Node.js global objects
- ✅ Process object and properties
- ✅ Command-line arguments
- ✅ Environment variables
- ✅ File system basics (optional)
- ✅ String formatting and templates
- ✅ Conditional logic
- ✅ Function organization

---

## 🎓 What You Learned

By completing this project, you've:
1. Explored Node.js process object deeply
2. Learned to work with command-line interfaces
3. Practiced formatting and displaying data
4. Understood environment configuration
5. Built a tool you can actually use!

---

## 🚀 Next Steps

- Add this tool to your PATH for global access
- Use it in future projects to debug environment issues
- Extend it as you learn more Node.js features
- Share it on GitHub as your first Node.js project!

---

**Congratulations!** 🎉 You've completed Day 1!

**Next**: [Day 2: V8 Engine & JavaScript Execution →](../../day-02-v8-engine/theory.md)
