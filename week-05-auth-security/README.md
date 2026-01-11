# Week 5: Authentication & Security

## 📋 Overview
Secure your applications with proper authentication, authorization, and security best practices.

## 🎯 Week Goals
- ✅ Implement JWT authentication
- ✅ Handle sessions properly
- ✅ Hash passwords securely
- ✅ Implement OAuth 2.0
- ✅ Protect against common attacks
- ✅ Configure CORS properly
- ✅ Apply security best practices

## 📅 Daily Breakdown

### [Day 29: Authentication vs Authorization](./day-29-auth-concepts/theory.md)
**Focus**: Understanding auth fundamentals
- Authentication vs Authorization
- Session-based vs Token-based auth
- Stateful vs Stateless authentication
- Common auth flows
- Security principles
- **Practice**: Auth flow diagrams

**Time**: 3-4 hours

---

### [Day 30: JWT (JSON Web Tokens)](./day-30-jwt/theory.md)
**Focus**: Token-based authentication
- What are JWTs?
- JWT structure (header, payload, signature)
- Creating and verifying tokens
- Access tokens vs Refresh tokens
- Token storage strategies
- JWT best practices
- **Practice**: JWT authentication API

**Time**: 4-5 hours

---

### [Day 31: Session-based Authentication](./day-31-sessions/theory.md)
**Focus**: Server-side session management
- Sessions vs Tokens
- express-session middleware
- Session stores (Memory, Redis)
- Cookie configuration
- CSRF protection
- Session security
- **Practice**: Session-based login system

**Time**: 4-5 hours

---

### [Day 32: Password Hashing (bcrypt)](./day-32-bcrypt/theory.md)
**Focus**: Secure password handling
- Why hash passwords?
- bcrypt algorithm
- Salt rounds
- Comparing passwords
- Password reset flows
- Password policies
- **Practice**: Secure user registration

**Time**: 3-4 hours

---

### [Day 33: OAuth 2.0 & Social Login](./day-33-oauth/theory.md)
**Focus**: Third-party authentication
- OAuth 2.0 flow
- Social login (Google, GitHub, Facebook)
- Passport.js strategies
- Authorization scopes
- Token management
- **Practice**: Social login integration

**Time**: 4-5 hours

---

### [Day 34: API Security Best Practices](./day-34-api-security/theory.md)
**Focus**: Securing your APIs
- Rate limiting
- API keys
- Input validation and sanitization
- SQL/NoSQL injection prevention
- XSS protection
- Security headers
- **Practice**: Secure API implementation

**Time**: 4-5 hours

---

### [Day 35: CORS, Helmet, & Rate Limiting](./day-35-cors-helmet/theory.md)
**Focus**: Essential security middleware
- CORS configuration
- Helmet.js security headers
- Rate limiting strategies
- DDoS protection
- Request size limiting
- Content Security Policy
- **Practice**: Production-ready security setup

**Time**: 3-4 hours

---

## 🎯 Week 5 Project: Secure Social Platform API

Build a secure social media API:

**Features:**
1. User registration with email verification
2. JWT authentication with refresh tokens
3. Social login (Google, GitHub)
4. Password reset flow
5. Role-based access control (RBAC)
6. Protected routes
7. Rate limiting per user
8. Security headers
9. API key for mobile apps
10. Audit logging

**Security Checklist:**
- [ ] Passwords hashed with bcrypt
- [ ] JWT tokens with expiration
- [ ] Refresh token rotation
- [ ] CORS configured properly
- [ ] Rate limiting enabled
- [ ] Input validation on all endpoints
- [ ] SQL injection prevention
- [ ] XSS protection
- [ ] CSRF tokens for state-changing operations
- [ ] Security headers (Helmet)
- [ ] HTTPS enforced
- [ ] Environment variables for secrets

**Technologies:**
- Express.js
- JWT (jsonwebtoken)
- bcrypt
- Passport.js
- express-rate-limit
- Helmet
- Joi/express-validator

---

**Next**: [Week 6: Advanced Concepts →](../week-06-advanced/README.md)
