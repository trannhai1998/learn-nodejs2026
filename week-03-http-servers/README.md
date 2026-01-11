# Week 3: HTTP & Web Servers

## 📋 Overview
Learn to build web servers, create RESTful APIs, and master Express.js framework.

## 🎯 Week Goals
- ✅ Understand HTTP protocol fundamentals
- ✅ Build HTTP servers from scratch
- ✅ Master Express.js framework
- ✅ Implement middleware patterns
- ✅ Design RESTful APIs
- ✅ Handle routing and parameters
- ✅ Implement error handling and validation

## 📅 Daily Breakdown

### [Day 15: HTTP Module Basics](./day-15-http-basics/theory.md)
**Focus**: Understanding HTTP protocol and Node.js http module
- HTTP request/response cycle
- HTTP methods (GET, POST, PUT, DELETE)
- Status codes and headers
- Request and response objects
- URL parsing and query strings
- **Practice**: Simple HTTP server

**Time**: 3-4 hours

---

### [Day 16: Building HTTP Servers](./day-16-simple-server/theory.md)
**Focus**: Creating servers with native http module
- Creating basic server
- Handling different routes
- Parsing request body
- Serving static files
- Content negotiation
- **Practice**: File server with routing

**Time**: 4-5 hours

---

### [Day 17: Express.js Introduction](./day-17-express-intro/theory.md)
**Focus**: Getting started with Express framework
- Why Express.js?
- Setting up Express
- Basic routing
- Request and response handling
- Template engines (optional)
- **Practice**: Express hello world and basic routes

**Time**: 3-4 hours

---

### [Day 18: Middleware & Request Pipeline](./day-18-middleware/theory.md)
**Focus**: Understanding and creating middleware
- Middleware concept
- Application-level middleware
- Router-level middleware
- Error-handling middleware
- Third-party middleware
- Custom middleware
- **Practice**: Build authentication middleware

**Time**: 4-5 hours

---

### [Day 19: Routing & Route Parameters](./day-19-routing/theory.md)
**Focus**: Advanced routing patterns
- Route parameters
- Query strings
- Route handlers
- Router module
- Route grouping
- **Practice**: User management routes

**Time**: 3-4 hours

---

### [Day 20: RESTful API Design](./day-20-restful-api/theory.md)
**Focus**: Building RESTful APIs
- REST principles
- Resource-based URLs
- HTTP methods for CRUD
- Status codes
- API versioning
- Response formats
- **Practice**: Complete CRUD API

**Time**: 4-5 hours

---

### [Day 21: Error Handling & Validation](./day-21-error-handling/theory.md)
**Focus**: Robust error handling and input validation
- Error handling patterns
- Custom error classes
- Validation libraries (Joi, express-validator)
- Error middleware
- Logging errors
- **Practice**: Validated API with error handling

**Time**: 4-5 hours

---

## 🎯 Week 3 Project: Task Management API

Build a complete RESTful API:

**Features:**
1. User authentication (JWT)
2. CRUD operations for tasks
3. Task categories and tags
4. Filtering and pagination
5. Input validation
6. Error handling
7. API documentation
8. Rate limiting

**Endpoints:**
```
POST   /api/auth/register
POST   /api/auth/login
GET    /api/tasks
POST   /api/tasks
GET    /api/tasks/:id
PUT    /api/tasks/:id
DELETE /api/tasks/:id
GET    /api/tasks/search?query=...
```

**Technologies:**
- Express.js
- JWT for auth
- Joi for validation
- Morgan for logging

---

**Next**: [Week 4: Databases & ORMs →](../week-04-databases/README.md)
