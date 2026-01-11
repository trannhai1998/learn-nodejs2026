# Week 4: Databases & ORMs

## 📋 Overview
Connect your Node.js applications to databases and master data persistence.

## 🎯 Week Goals
- ✅ Understand SQL vs NoSQL databases
- ✅ Work with MongoDB and Mongoose
- ✅ Work with PostgreSQL
- ✅ Master Prisma ORM
- ✅ Design database schemas
- ✅ Handle relationships
- ✅ Write efficient queries

## 📅 Daily Breakdown

### [Day 22: Database Fundamentals](./day-22-db-fundamentals/theory.md)
**Focus**: Database concepts and choosing the right database
- SQL vs NoSQL
- ACID properties
- CAP theorem
- Database design principles
- Normalization
- When to use which database
- **Practice**: Design database schemas

**Time**: 3-4 hours

---

### [Day 23: MongoDB & Mongoose (Part 1)](./day-23-mongodb-part1/theory.md)
**Focus**: Getting started with MongoDB
- MongoDB installation and setup
- Document-based data model
- CRUD operations
- Mongoose ODM basics
- Schema definition
- Models and collections
- **Practice**: User management with MongoDB

**Time**: 4-5 hours

---

### [Day 24: MongoDB & Mongoose (Part 2)](./day-24-mongodb-part2/theory.md)
**Focus**: Advanced Mongoose features
- Schema validation
- Virtuals and methods
- Middleware (hooks)
- Population (relationships)
- Queries and aggregation
- Indexing
- **Practice**: Blog with comments system

**Time**: 4-5 hours

---

### [Day 25: PostgreSQL & pg](./day-25-postgresql/theory.md)
**Focus**: Relational databases with PostgreSQL
- PostgreSQL setup
- SQL basics (SELECT, INSERT, UPDATE, DELETE)
- Joins and relationships
- Transactions
- node-postgres library
- Query parameterization
- **Practice**: Product catalog with SQL

**Time**: 4-5 hours

---

### [Day 26: Prisma ORM](./day-26-prisma-orm/theory.md)
**Focus**: Modern ORM for Node.js
- Prisma setup and schema
- Migrations
- Prisma Client
- CRUD operations
- Relations
- Prisma Studio
- **Practice**: E-commerce database with Prisma

**Time**: 4-5 hours

---

### [Day 27: Database Relationships & Queries](./day-27-relationships/theory.md)
**Focus**: Complex relationships and queries
- One-to-one relationships
- One-to-many relationships
- Many-to-many relationships
- Query optimization
- Eager vs lazy loading
- **Practice**: Social media data model

**Time**: 4-5 hours

---

### [Day 28: Database Best Practices](./day-28-best-practices/theory.md)
**Focus**: Production-ready database usage
- Connection pooling
- Error handling
- Data validation
- Security (SQL injection, NoSQL injection)
- Backups and migrations
- Performance optimization
- **Practice**: Optimize existing database

**Time**: 3-4 hours

---

## 🎯 Week 4 Project: Library Management System

Build a complete system with database:

**Features:**
1. User management (students, librarians)
2. Book catalog with categories
3. Borrow/return system
4. Fine calculation
5. Search functionality
6. Report generation
7. Data validation
8. Error handling

**Database Schema:**
```
Users (id, name, email, role)
Books (id, title, author, isbn, category_id)
Categories (id, name)
Borrows (id, user_id, book_id, borrow_date, return_date, status)
Fines (id, borrow_id, amount, paid)
```

**Technologies:**
- Express.js
- PostgreSQL with Prisma (or MongoDB with Mongoose)
- JWT authentication
- Data validation

---

**Next**: [Week 5: Authentication & Security →](../week-05-auth-security/README.md)
