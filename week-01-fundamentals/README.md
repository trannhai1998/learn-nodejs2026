# Week 1: Node.js Fundamentals

## 📋 Overview
Master the core concepts of Node.js runtime, JavaScript execution, and asynchronous programming.

## 🎯 Week Goals
By the end of this week, you will:
- ✅ Understand Node.js architecture deeply
- ✅ Know how V8 engine executes JavaScript
- ✅ Master the event loop and async patterns
- ✅ Work confidently with Node.js module systems
- ✅ Handle errors and async operations properly

## 📅 Daily Breakdown

### [Day 1: Introduction to Node.js & Runtime Environment](./day-01-introduction/theory.md)
**Focus**: What is Node.js and how it works
- Node.js architecture and components
- Browser vs Node.js differences
- Global objects and process
- Setting up development environment
- **Practice**: Build Environment Inspector CLI

**Time**: 3-4 hours

---

### [Day 2: V8 Engine & JavaScript Execution](./day-02-v8-engine/theory.md)
**Focus**: How JavaScript code gets executed
- V8 compilation pipeline (Parser → AST → Bytecode → Machine code)
- Memory management and garbage collection
- Call stack and execution context
- Performance optimization techniques
- **Practice**: Memory profiling and optimization

**Time**: 3-4 hours

---

### [Day 3: Event Loop Deep Dive](./day-03-event-loop/theory.md)
**Focus**: Non-blocking I/O and event-driven architecture
- Event loop phases (timers, poll, check, etc.)
- Microtasks vs Macrotasks
- `process.nextTick()` vs `setImmediate()`
- Blocking vs non-blocking operations
- **Practice**: Visualize and debug event loop behavior

**Time**: 4-5 hours

---

### [Day 4: Module System](./day-04-modules/theory.md)
**Focus**: Code organization and reusability
- CommonJS vs ES Modules
- `require()` vs `import/export`
- Module caching and resolution
- Creating your own modules
- Built-in modules overview
- **Practice**: Build a modular application structure

**Time**: 3-4 hours

---

### [Day 5: NPM & Package Management](./day-05-npm/theory.md)
**Focus**: Working with the Node.js ecosystem
- Understanding `package.json` and `package-lock.json`
- Installing and managing dependencies
- Semantic versioning (semver)
- NPM scripts and automation
- Publishing packages
- **Practice**: Create and publish your first NPM package

**Time**: 3-4 hours

---

### [Day 6: Asynchronous Programming - Callbacks & Promises](./day-06-async-callbacks-promises/theory.md)
**Focus**: Handling asynchronous operations
- Callback pattern and callback hell
- Promises (resolve, reject, then, catch)
- Promise chaining and composition
- Error handling in async code
- Converting callbacks to Promises
- **Practice**: Build async file processor

**Time**: 4-5 hours

---

### [Day 7: Async/Await & Error Handling](./day-07-async-await/theory.md)
**Focus**: Modern async patterns and error management
- Async/await syntax and usage
- Error handling with try/catch
- Parallel vs sequential execution
- Error-first callbacks pattern
- Custom error classes
- **Practice**: Build robust async application

**Time**: 4-5 hours

---

## 📊 Week Assessment

### Knowledge Check
After completing Week 1, you should be able to answer:

1. **Architecture**
   - What are the main components of Node.js?
   - How does Node.js achieve non-blocking I/O?
   - What is the role of libuv?

2. **V8 Engine**
   - How does V8 compile JavaScript?
   - What is garbage collection?
   - How can you optimize code for V8?

3. **Event Loop**
   - What are the phases of the event loop?
   - What's the difference between nextTick and setImmediate?
   - How do microtasks and macrotasks differ?

4. **Modules**
   - When should you use CommonJS vs ES Modules?
   - How does module caching work?
   - What is the module resolution algorithm?

5. **Async Programming**
   - What is callback hell and how to avoid it?
   - How do Promises work internally?
   - When should you use Promise.all vs Promise.race?
   - How to handle errors in async/await?

### Practical Skills
You should be able to:
- [ ] Set up a Node.js project from scratch
- [ ] Debug Node.js applications
- [ ] Write non-blocking code
- [ ] Create and use modules
- [ ] Handle async operations with Promises and async/await
- [ ] Implement proper error handling

## 🎯 Mini Project: File Management CLI

Apply everything you learned this week:

**Requirements:**
Build a CLI tool that:
1. Lists files in a directory (async)
2. Reads file contents
3. Writes to files
4. Copies files
5. Uses modular code structure
6. Handles errors gracefully
7. Uses NPM packages (chalk, ora, etc.)
8. Implements async/await

**Example usage:**
```bash
node file-cli.js list ./
node file-cli.js read file.txt
node file-cli.js write output.txt "Hello World"
node file-cli.js copy source.txt dest.txt
```

**Skills practiced:**
- ✅ Module system
- ✅ NPM packages
- ✅ Async operations
- ✅ Error handling
- ✅ File system APIs
- ✅ Command-line arguments

## 📚 Additional Resources

### Documentation
- [Node.js Official Docs](https://nodejs.org/docs)
- [V8 Documentation](https://v8.dev/docs)
- [libuv Documentation](http://docs.libuv.org/)

### Articles
- [The Node.js Event Loop](https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/)
- [Understanding the V8 JavaScript Engine](https://blog.sessionstack.com/how-javascript-works-inside-the-v8-engine-5-tips-on-how-to-write-optimized-code-ac089e62b12e)
- [JavaScript Modules: A Beginner's Guide](https://www.freecodecamp.org/news/javascript-modules-a-beginner-s-guide-783f7d7a5fcc/)

### Videos
- [What the heck is the event loop anyway?](https://www.youtube.com/watch?v=8aGhZQkoFbQ)
- [Node.js Under the Hood](https://www.youtube.com/watch?v=sGTRmPiXD4Y)

### Books
- "Node.js Design Patterns" by Mario Casciaro
- "You Don't Know Node" by Azat Mardan

## 🎓 Week 1 Completion Checklist

Before moving to Week 2:
- [ ] Completed all 7 days of theory
- [ ] Finished all exercises
- [ ] Built practice projects
- [ ] Can explain key concepts to someone else
- [ ] Comfortable with async programming
- [ ] Understand module systems
- [ ] Can debug Node.js applications

## 💬 Common Questions

**Q: How long should Week 1 take?**
A: 20-30 hours total. Can be completed in 1 week (3-4 hours/day) or spread across 2 weeks.

**Q: Do I need to memorize everything?**
A: No! Focus on understanding concepts. You'll reference docs often in real work.

**Q: What if I don't understand something?**
A: Re-read the material, do the exercises, search online, and ask in Node.js communities.

**Q: Should I do all exercises?**
A: Yes! Hands-on practice is crucial. Don't skip exercises.

**Q: Can I use AI tools (ChatGPT, Copilot)?**
A: Yes, but understand the code they generate. Don't just copy-paste.

## 🚀 Next Steps

**Ready for Week 2?** 
- Review your Week 1 notes
- Complete the mini project
- Take a short break
- Move to [Week 2: Core Modules & File System →](../week-02-core-modules/README.md)

**Need more practice?**
- Build additional small projects
- Explore Node.js source code on GitHub
- Contribute to open-source Node.js projects

---

**Great job completing Week 1!** 🎉

You now have a solid foundation in Node.js fundamentals. The concepts you learned this week will be applied throughout the entire course.

**Keep coding! 💪**
