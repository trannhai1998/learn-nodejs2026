# Week 7-8: Real-world Projects

## 📋 Overview
Apply everything you've learned by building two complete, production-ready full-stack applications.

## 🎯 Goals
- Build complex, real-world applications
- Integrate frontend with backend
- Apply all learned concepts
- Create portfolio-worthy projects
- Practice professional development workflow
- Deploy to production

---

## 🛒 Project 1: E-commerce API (Days 43-49)

### Overview
Build a complete e-commerce backend API that a React/Vue frontend can consume.

### Features

#### **User Management**
- User registration with email verification
- Login with JWT authentication
- Password reset flow
- User profile management
- Address management
- Order history

#### **Product Management**
- Product CRUD (admin only)
- Product categories and subcategories
- Product images (multiple)
- Product variants (size, color)
- Inventory management
- Product search and filtering
- Product reviews and ratings

#### **Shopping Cart**
- Add/remove items
- Update quantities
- Cart persistence (for logged-in users)
- Cart expiration
- Price calculation

#### **Order Management**
- Checkout process
- Order creation
- Order status tracking
- Order history
- Invoice generation

#### **Payment Integration**
- Stripe integration
- Payment processing
- Webhook handling
- Refund processing

#### **Admin Dashboard**
- Sales analytics
- User management
- Product management
- Order management
- Revenue reports

### Technical Requirements

**Architecture:**
```
ecommerce-api/
├── src/
│   ├── config/
│   │   ├── database.js
│   │   ├── redis.js
│   │   └── stripe.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   ├── Order.js
│   │   ├── Cart.js
│   │   └── Review.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── productController.js
│   │   ├── orderController.js
│   │   └── paymentController.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── products.js
│   │   ├── orders.js
│   │   └── admin.js
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── validate.js
│   │   ├── errorHandler.js
│   │   └── upload.js
│   ├── services/
│   │   ├── emailService.js
│   │   ├── paymentService.js
│   │   └── imageService.js
│   ├── utils/
│   │   ├── helpers.js
│   │   └── validators.js
│   └── tests/
│       ├── auth.test.js
│       ├── products.test.js
│       └── orders.test.js
├── uploads/
├── .env
├── package.json
└── README.md
```

**Tech Stack:**
- Express.js
- MongoDB with Mongoose (or PostgreSQL with Prisma)
- JWT authentication
- Stripe for payments
- AWS S3 for image storage
- Redis for caching
- Jest for testing
- Docker

**API Endpoints:**
```
# Authentication
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/refresh
POST   /api/auth/forgot-password
POST   /api/auth/reset-password
GET    /api/auth/me

# Products
GET    /api/products
GET    /api/products/:id
POST   /api/products (admin)
PUT    /api/products/:id (admin)
DELETE /api/products/:id (admin)
GET    /api/products/search?q=...
GET    /api/products/category/:category

# Cart
GET    /api/cart
POST   /api/cart/items
PUT    /api/cart/items/:id
DELETE /api/cart/items/:id
DELETE /api/cart

# Orders
POST   /api/orders
GET    /api/orders
GET    /api/orders/:id
PUT    /api/orders/:id/cancel

# Payments
POST   /api/payments/create-intent
POST   /api/payments/webhook

# Reviews
POST   /api/products/:id/reviews
GET    /api/products/:id/reviews
PUT    /api/reviews/:id
DELETE /api/reviews/:id

# Admin
GET    /api/admin/stats
GET    /api/admin/users
GET    /api/admin/orders
```

### Frontend Integration

**React Example:**
```javascript
// API service
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Product list component
function ProductList() {
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    api.get('/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);
  
  return (
    <div>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

### Day-by-Day Plan

**Day 43:** Project setup, database schema, authentication
**Day 44:** Product management and image uploads
**Day 45:** Shopping cart and inventory
**Day 46:** Order system and checkout
**Day 47:** Stripe payment integration
**Day 48:** Testing and optimization
**Day 49:** Deployment and documentation

---

## 💬 Project 2: Real-time Chat Application (Days 50-56)

### Overview
Build a real-time chat application with WebSockets, supporting private and group chats.

### Features

#### **User Features**
- User registration and login
- Profile with avatar
- Online/offline status
- User search
- Friend system

#### **Messaging**
- One-on-one private chats
- Group chats (create, join, leave)
- Real-time message delivery
- Message read receipts
- Typing indicators
- Message history
- File sharing (images, documents)
- Emoji support

#### **Real-time Features**
- Instant message delivery
- Online status updates
- Typing indicators
- Push notifications
- Unread message counts

#### **Group Chats**
- Create groups
- Add/remove members
- Group admin roles
- Group info and settings
- Member list

### Technical Requirements

**Architecture:**
```
chat-app/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── database.js
│   │   │   ├── redis.js
│   │   │   └── socket.js
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── Message.js
│   │   │   ├── Conversation.js
│   │   │   └── Group.js
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── messageController.js
│   │   │   └── groupController.js
│   │   ├── socket/
│   │   │   ├── handlers/
│   │   │   │   ├── messageHandler.js
│   │   │   │   ├── typingHandler.js
│   │   │   │   └── statusHandler.js
│   │   │   └── middleware/
│   │   │       └── socketAuth.js
│   │   └── routes/
│   │       ├── auth.js
│   │       ├── messages.js
│   │       └── groups.js
│   └── server.js
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── ChatList.jsx
    │   │   ├── ChatWindow.jsx
    │   │   ├── MessageInput.jsx
    │   │   └── UserStatus.jsx
    │   ├── services/
    │   │   ├── api.js
    │   │   └── socket.js
    │   └── App.jsx
```

**Tech Stack:**
- Express.js
- Socket.io
- PostgreSQL with Prisma (or MongoDB)
- Redis for pub/sub and presence
- JWT authentication
- React for frontend
- Docker

**Socket.io Events:**
```javascript
// Client → Server
'message:send'
'message:read'
'typing:start'
'typing:stop'
'user:online'
'user:offline'

// Server → Client
'message:new'
'message:delivered'
'message:read'
'typing:indicator'
'user:status'
'notification:new'
```

**API Endpoints:**
```
# Authentication
POST   /api/auth/register
POST   /api/auth/login
GET    /api/auth/me

# Messages
GET    /api/messages/:conversationId
POST   /api/messages
PUT    /api/messages/:id/read
DELETE /api/messages/:id

# Conversations
GET    /api/conversations
GET    /api/conversations/:id
POST   /api/conversations
DELETE /api/conversations/:id

# Groups
POST   /api/groups
GET    /api/groups/:id
PUT    /api/groups/:id
POST   /api/groups/:id/members
DELETE /api/groups/:id/members/:userId

# Users
GET    /api/users/search?q=...
GET    /api/users/:id
PUT    /api/users/profile
```

### Real-time Implementation

**Backend Socket.io:**
```javascript
const io = require('socket.io')(server, {
  cors: { origin: 'http://localhost:3000' }
});

// Authentication middleware
io.use(async (socket, next) => {
  const token = socket.handshake.auth.token;
  try {
    const user = await verifyToken(token);
    socket.userId = user.id;
    next();
  } catch (err) {
    next(new Error('Authentication error'));
  }
});

io.on('connection', (socket) => {
  console.log('User connected:', socket.userId);
  
  // Join user's personal room
  socket.join(`user:${socket.userId}`);
  
  // Broadcast online status
  socket.broadcast.emit('user:status', {
    userId: socket.userId,
    status: 'online'
  });
  
  // Handle new message
  socket.on('message:send', async (data) => {
    const message = await saveMessage(data);
    
    // Send to recipient
    io.to(`user:${data.recipientId}`).emit('message:new', message);
    
    // Confirm to sender
    socket.emit('message:delivered', { messageId: message.id });
  });
  
  // Handle typing
  socket.on('typing:start', (data) => {
    socket.to(`user:${data.recipientId}`).emit('typing:indicator', {
      userId: socket.userId,
      isTyping: true
    });
  });
  
  // Handle disconnect
  socket.on('disconnect', () => {
    socket.broadcast.emit('user:status', {
      userId: socket.userId,
      status: 'offline'
    });
  });
});
```

**Frontend React:**
```javascript
import io from 'socket.io-client';

function ChatApp() {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  
  useEffect(() => {
    // Connect to socket
    const newSocket = io('http://localhost:5000', {
      auth: { token: localStorage.getItem('token') }
    });
    
    setSocket(newSocket);
    
    // Listen for new messages
    newSocket.on('message:new', (message) => {
      setMessages(prev => [...prev, message]);
    });
    
    // Listen for typing
    newSocket.on('typing:indicator', (data) => {
      // Show typing indicator
    });
    
    return () => newSocket.close();
  }, []);
  
  const sendMessage = (text) => {
    socket.emit('message:send', {
      recipientId: currentChat.id,
      text: text
    });
  };
  
  return <ChatInterface onSend={sendMessage} />;
}
```

### Day-by-Day Plan

**Day 50:** Project setup, authentication, database
**Day 51:** Socket.io integration, basic messaging
**Day 52:** Real-time features (typing, status)
**Day 53:** Group chats and file sharing
**Day 54:** Frontend integration with React
**Day 55:** Testing and optimization
**Day 56:** Deployment and final touches

---

## 🎯 Success Criteria

After completing both projects, you should have:

- [ ] Two fully functional, production-ready applications
- [ ] Clean, well-documented code
- [ ] Comprehensive test coverage
- [ ] Deployed applications (live URLs)
- [ ] API documentation
- [ ] Frontend integrated with backend
- [ ] Security best practices implemented
- [ ] Performance optimized
- [ ] Error handling and logging
- [ ] GitHub repositories with good README

---

## 📚 Deliverables

For each project:

1. **Source Code** on GitHub
2. **README.md** with:
   - Project description
   - Features list
   - Tech stack
   - Setup instructions
   - API documentation
   - Screenshots/Demo
3. **Deployed Application**
4. **API Documentation** (Postman/Swagger)
5. **Test Coverage Report**

---

## 🎉 Congratulations!

You've completed the Node.js 2026 Roadmap! You now have:

✅ Deep understanding of Node.js
✅ Two production-ready projects
✅ Full-stack development skills
✅ Portfolio to showcase
✅ Real-world experience

**Next steps:**
- Apply for jobs
- Contribute to open source
- Build your own projects
- Keep learning and growing!

**You're now a Node.js Developer! 🚀**
