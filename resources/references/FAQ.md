# FAQ - Frequently Asked Questions

## 🎯 General Questions

### Q: Do I need to know JavaScript before learning Node.js?
**A:** Yes, you should be comfortable with:
- ES6+ syntax (arrow functions, async/await, destructuring)
- Promises and asynchronous programming
- Array methods (map, filter, reduce)
- Object manipulation
- Basic algorithms

If you're coming from frontend development (React/Vue), you already have the JavaScript skills needed!

### Q: How long does it take to learn Node.js?
**A:** It depends on your background:
- **With JS experience**: 2-3 months to be job-ready
- **Complete beginner**: 4-6 months
- **To master**: 1-2 years of continuous practice

This roadmap is designed for 8 weeks of focused learning (3-4 hours/day).

### Q: Is Node.js only for backend development?
**A:** No! Node.js is used for:
- Backend APIs and web servers
- CLI tools (like npm, webpack)
- Build tools (Vite, esbuild)
- Desktop apps (Electron)
- Mobile backends
- IoT applications
- Microservices

### Q: What's the difference between Node.js and JavaScript?
**A:** 
- **JavaScript** is the programming language
- **Node.js** is the runtime that executes JavaScript outside the browser
- Think of it like: JavaScript is the language, Node.js is the environment

### Q: Can I get a job after this roadmap?
**A:** Yes, if you:
- Complete all projects
- Build a portfolio with 2-3 strong projects
- Understand concepts deeply (not just copy-paste)
- Can explain your code in interviews
- Practice coding challenges
- Contribute to open source (bonus)

---

## 💻 Technical Questions

### Q: CommonJS or ES Modules?
**A:** 
- **Use ES Modules** for new projects (modern standard)
- **Use CommonJS** if working with legacy code or packages that don't support ESM
- You can use both, but be consistent within a project

```javascript
// ES Modules (recommended)
import express from 'express';
export default myFunction;

// CommonJS (older)
const express = require('express');
module.exports = myFunction;
```

### Q: Synchronous or Asynchronous operations?
**A:**
- **Always use async** in production (except initialization)
- **Use sync** only for:
  - Loading config at startup
  - CLI tools with no concurrency
  - Build scripts

```javascript
// ✅ Good - Async
const data = await fs.promises.readFile('file.txt');

// ❌ Bad - Blocks the event loop
const data = fs.readFileSync('file.txt');
```

### Q: Which database should I use?
**A:** It depends on your needs:

**MongoDB (NoSQL):**
- ✅ Flexible schema
- ✅ Fast for simple queries
- ✅ Good for rapid prototyping
- ❌ No built-in relationships
- ❌ No transactions (before v4.0)

**PostgreSQL (SQL):**
- ✅ Strong ACID compliance
- ✅ Complex queries and joins
- ✅ Data integrity
- ❌ Rigid schema
- ❌ Steeper learning curve

**General advice:** Start with what you know, then learn the other.

### Q: How do I handle errors in async/await?
**A:** Always use try-catch:

```javascript
// ✅ Good
async function getData() {
  try {
    const data = await fetchData();
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error; // or handle appropriately
  }
}

// ✅ Better - Express error handling
app.get('/data', async (req, res, next) => {
  try {
    const data = await fetchData();
    res.json(data);
  } catch (error) {
    next(error); // Pass to error middleware
  }
});
```

### Q: How do I secure my Node.js application?
**A:** Follow these practices:
1. Use environment variables for secrets
2. Validate and sanitize all input
3. Use HTTPS
4. Implement rate limiting
5. Use security headers (Helmet)
6. Hash passwords with bcrypt
7. Use JWT with expiration
8. Keep dependencies updated
9. Never trust user input
10. Use security linters (ESLint security plugins)

---

## 🛠️ Development Questions

### Q: What IDE should I use?
**A:** **VS Code** is the most popular choice:
- Free and open-source
- Excellent Node.js support
- Great extensions ecosystem
- Built-in debugger
- Integrated terminal

Other options: WebStorm (paid), Atom, Sublime Text

### Q: How do I debug Node.js applications?
**A:**

**1. Console.log (quick debugging):**
```javascript
console.log('Value:', myVariable);
console.error('Error:', error);
console.table(arrayOfObjects);
```

**2. Node.js Debugger:**
```bash
node --inspect app.js
# Then open chrome://inspect
```

**3. VS Code Debugger:**
- Set breakpoints
- Press F5 to start debugging
- Inspect variables and call stack

### Q: How do I structure my Node.js project?
**A:** Follow this structure:

```
project/
├── src/
│   ├── config/       # Configuration files
│   ├── controllers/  # Route handlers
│   ├── models/       # Database models
│   ├── routes/       # API routes
│   ├── middleware/   # Custom middleware
│   ├── services/     # Business logic
│   ├── utils/        # Helper functions
│   └── tests/        # Test files
├── .env              # Environment variables
├── .gitignore
├── package.json
└── README.md
```

### Q: How many packages should I install?
**A:** 
- Install what you need
- Prefer well-maintained packages
- Check weekly downloads and issues
- Read the code if it's a small package
- Be cautious with dependencies

**Essential packages:**
- express (web framework)
- dotenv (environment variables)
- mongoose or prisma (database)
- jsonwebtoken (authentication)
- bcrypt (password hashing)
- joi or express-validator (validation)
- jest (testing)

---

## 📚 Learning Questions

### Q: Should I learn everything in this roadmap?
**A:** 
- **Weeks 1-4** are essential - master these
- **Weeks 5-6** are important for production apps
- **Weeks 7-8** projects solidify everything
- You can skip advanced topics initially and come back later

### Q: Can I skip the exercises?
**A:** **No!** Exercises are crucial:
- Reading alone doesn't make you a developer
- You need to write code to learn
- Exercises expose knowledge gaps
- Practice makes perfect

### Q: I'm stuck on a concept, what should I do?
**A:**
1. Re-read the theory
2. Search for the concept on Google/YouTube
3. Check official documentation
4. Ask in communities (Stack Overflow, Discord, Reddit)
5. Try explaining it to someone (rubber duck debugging)
6. Take a break and come back fresh
7. Build a simple project using that concept

### Q: How do I know if I'm ready to move to the next topic?
**A:** You're ready when you can:
- Explain the concept to someone else
- Complete exercises without looking at solutions
- Build a small project using that concept
- Debug common errors
- Know where to find more information

---

## 💼 Career Questions

### Q: What jobs can I apply for?
**A:** With Node.js skills:
- Backend Developer
- Full-stack Developer (Node.js/React)
- API Developer
- Node.js Engineer
- JavaScript Developer (Backend)
- Software Engineer (if you know multiple stacks)

### Q: What salary can I expect?
**A:** It varies by location and experience:
- **Entry-level (0-2 years)**: $50k-$80k
- **Mid-level (2-5 years)**: $80k-$120k
- **Senior (5+ years)**: $120k-$180k+

Remote positions often pay more. These are US averages; adjust for your location.

### Q: Do I need a computer science degree?
**A:** **No!** Many successful developers are self-taught:
- Focus on building projects
- Contribute to open source
- Have a strong portfolio
- Practice coding interviews
- Be able to explain your work

However, some companies require degrees. Don't let it stop you from applying!

### Q: How do I prepare for Node.js interviews?
**A:**

**1. Review concepts:**
- Event loop and async programming
- RESTful API design
- Database relationships
- Authentication patterns
- Error handling
- Testing strategies

**2. Practice coding:**
- LeetCode/HackerRank problems
- Build APIs from scratch
- Explain your code out loud

**3. Prepare projects:**
- Have 2-3 projects to discuss
- Know your code deeply
- Explain trade-offs you made
- Be ready to add features live

**4. Common questions:**
- "Explain the event loop"
- "Difference between Node.js and browser JS"
- "How do you handle errors?"
- "How do you scale Node.js apps?"
- "Explain your project architecture"

---

## 🔧 Tool Questions

### Q: NPM or Yarn or PNPM?
**A:**
- **npm**: Default, widely used, gets the job done
- **Yarn**: Faster, better workspace support
- **pnpm**: Fastest, saves disk space

**Recommendation:** Start with npm, switch later if needed.

### Q: Express or Fastify or NestJS?
**A:**
- **Express**: Most popular, huge ecosystem, simple
- **Fastify**: Faster, modern, good TypeScript support
- **NestJS**: Angular-like, great for large teams, TypeScript-first

**Recommendation:** Learn Express first (most job postings), explore others later.

### Q: REST or GraphQL?
**A:**
- **REST**: 
  - Simpler to learn
  - Better caching
  - More job opportunities
  - Start here

- **GraphQL**:
  - Flexible queries
  - Less over/under fetching
  - Steeper learning curve
  - Learn after mastering REST

---

## 🐛 Common Problems

### Q: "Cannot find module" error
**A:**
```bash
# Make sure you installed the package
npm install package-name

# Check your import statement
# CommonJS: const pkg = require('package-name')
# ES Modules: import pkg from 'package-name'

# Check node_modules exists
ls node_modules/
```

### Q: Port already in use
**A:**
```bash
# Find process on port
lsof -i :3000

# Kill process
kill -9 <PID>

# Or use different port
PORT=3001 node app.js
```

### Q: "ENOENT: no such file or directory"
**A:**
- Check file path is correct
- Use path.join() for cross-platform paths
- Check file exists
- Check you're in the right directory

### Q: Database connection failed
**A:**
- Check database is running
- Verify connection string
- Check firewall rules
- Verify credentials
- Check network connectivity

---

## 🎯 Best Practices

### Q: How often should I commit to Git?
**A:** Commit frequently:
- After completing a feature
- Before major refactoring
- At logical breakpoints
- Use meaningful commit messages
- Push daily (at least)

### Q: How do I name things?
**A:** Follow these conventions:
- **Files**: kebab-case.js (user-controller.js)
- **Variables/Functions**: camelCase (getUserById)
- **Classes**: PascalCase (UserController)
- **Constants**: UPPER_SNAKE_CASE (MAX_RETRIES)
- **Private**: _prefixWithUnderscore

### Q: How many comments should I write?
**A:**
- Code should be self-documenting
- Comment **why**, not **what**
- Document complex algorithms
- Add JSDoc for public APIs
- Remove commented-out code

```javascript
// ❌ Bad comment
// This function gets user by ID
function getUserById(id) {}

// ✅ Good comment
// Retries up to 3 times if database is temporarily unavailable
async function getUserById(id) {}
```

---

**Still have questions?** 
- Check the [Learning Resources](./learning-resources.md)
- Join Node.js communities
- Ask in Stack Overflow
- Open an issue on GitHub

**Happy Learning! 🚀**
