# Week 2: Core Modules & File System

## 📋 Overview
Deep dive into Node.js built-in modules, focusing on file system operations, streams, buffers, and events.

## 🎯 Week Goals
By the end of this week, you will:
- ✅ Master file system operations (read, write, watch)
- ✅ Understand streams and buffers for efficient data handling
- ✅ Work with path and OS modules
- ✅ Create event-driven applications
- ✅ Handle child processes
- ✅ Build efficient data processing pipelines

## 📅 Daily Breakdown

### [Day 8: File System Module](./day-08-file-system/theory.md)
**Focus**: Reading, writing, and managing files
- Synchronous vs Asynchronous file operations
- Reading files (readFile, readFileSync)
- Writing files (writeFile, appendFile)
- File metadata (stat, access)
- Working with directories
- **Practice**: Build a file backup tool

**Time**: 3-4 hours

---

### [Day 9: Path & OS Modules](./day-09-path-os/theory.md)
**Focus**: Cross-platform path handling and system information
- Path manipulation (join, resolve, dirname, basename)
- Working with file extensions
- Cross-platform path handling
- OS module (platform, cpus, memory, network)
- Environment information
- **Practice**: System information dashboard

**Time**: 3-4 hours

---

### [Day 10: Streams & Buffers (Part 1)](./day-10-streams-part1/theory.md)
**Focus**: Understanding streams fundamentals
- What are streams and why use them
- Types of streams (Readable, Writable, Duplex, Transform)
- Stream events and methods
- Piping streams
- Backpressure handling
- **Practice**: Stream-based file processor

**Time**: 4-5 hours

---

### [Day 11: Streams & Buffers (Part 2)](./day-11-streams-part2/theory.md)
**Focus**: Advanced stream patterns and buffers
- Buffer operations and manipulation
- Transform streams
- Stream composition
- Error handling in streams
- Performance optimization
- **Practice**: CSV processor with streams

**Time**: 4-5 hours

---

### [Day 12: Events & EventEmitter](./day-12-events/theory.md)
**Focus**: Event-driven programming in Node.js
- EventEmitter class
- Creating custom events
- Event listeners (on, once, off)
- Event propagation
- Error events
- **Practice**: Build a custom event system

**Time**: 3-4 hours

---

### [Day 13: Process & Child Processes](./day-13-process-child/theory.md)
**Focus**: Process management and spawning commands
- Process object deep dive
- Environment variables
- Command-line arguments
- Exit codes and signals
- Child processes (spawn, exec, fork)
- **Practice**: Task runner CLI

**Time**: 4-5 hours

---

### [Day 14: Week Review & Mini Project](./day-14-review/theory.md)
**Focus**: Consolidate Week 2 knowledge
- Review all concepts
- Best practices
- Common patterns
- Performance considerations
- **Practice**: Build a complete log analyzer

**Time**: 4-5 hours

---

## 📊 Week Assessment

### Knowledge Check
After completing Week 2, you should be able to answer:

1. **File System**
   - When to use sync vs async file operations?
   - How to handle large files efficiently?
   - How to watch for file changes?

2. **Streams**
   - What problems do streams solve?
   - How does backpressure work?
   - When to use each type of stream?

3. **Events**
   - How does EventEmitter work?
   - How to create custom events?
   - How to handle errors in event emitters?

4. **Process**
   - How to handle process signals?
   - When to use child_process vs worker_threads?
   - How to pass data to child processes?

### Practical Skills
You should be able to:
- [ ] Read and write files efficiently
- [ ] Process large files with streams
- [ ] Create event-driven applications
- [ ] Handle cross-platform paths
- [ ] Spawn and manage child processes
- [ ] Build CLI tools with process management

## 🎯 Week 2 Project: Log Analyzer CLI

Build a comprehensive log file analyzer that:

**Requirements:**
1. Read large log files using streams
2. Parse log entries (timestamp, level, message)
3. Filter by date range and log level
4. Generate statistics (errors, warnings, info)
5. Watch log files for real-time updates
6. Export results to JSON/CSV
7. Use EventEmitter for progress updates
8. Handle errors gracefully

**Example usage:**
```bash
node log-analyzer.js access.log --level error --from 2026-01-01
node log-analyzer.js access.log --watch --output stats.json
node log-analyzer.js access.log --stats
```

**Skills practiced:**
- ✅ Stream-based file processing
- ✅ Event-driven architecture
- ✅ File system operations
- ✅ Path handling
- ✅ Process arguments
- ✅ Real-time monitoring

## 📚 Additional Resources

### Documentation
- [Node.js File System](https://nodejs.org/api/fs.html)
- [Node.js Streams](https://nodejs.org/api/stream.html)
- [Node.js Events](https://nodejs.org/api/events.html)
- [Node.js Child Process](https://nodejs.org/api/child_process.html)

### Articles
- [Understanding Streams in Node.js](https://nodesource.com/blog/understanding-streams-in-nodejs)
- [Mastering the Node.js fs Module](https://blog.risingstack.com/mastering-the-filesystem-in-node-js/)
- [Event-Driven Programming in Node.js](https://www.freecodecamp.org/news/event-driven-programming-in-nodejs/)

## 🎓 Week 2 Completion Checklist

Before moving to Week 3:
- [ ] Completed all 7 days of theory
- [ ] Finished all exercises
- [ ] Built practice projects
- [ ] Completed the log analyzer project
- [ ] Comfortable with streams and events
- [ ] Understand async file operations
- [ ] Can build CLI tools

## 💬 Common Questions

**Q: Why use streams instead of reading entire files?**
A: Streams handle large files efficiently without loading everything into memory. Essential for production apps.

**Q: When should I use synchronous file operations?**
A: Only for initialization/config loading at startup. Never in request handlers.

**Q: What's the difference between spawn and exec?**
A: spawn streams data, exec buffers it. Use spawn for long-running processes.

**Q: How do I handle file paths across OS?**
A: Always use path.join() or path.resolve(), never string concatenation.

## 🚀 Next Steps

**Ready for Week 3?** 
- Review your Week 2 notes
- Complete the log analyzer project
- Move to [Week 3: HTTP & Web Servers →](../week-03-http-servers/README.md)

---

**Great progress!** 🎉 You now understand Node.js core modules deeply!
