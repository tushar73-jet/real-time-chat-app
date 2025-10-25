// server.js
require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const prisma = require('./src/config/prisma'); 
const authRoutes = require('./src/routes/auth');
const authSocket = require('./src/middleware/authSocket'); 

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// --- Middleware ---
app.use(cors()); // Use cors middleware
app.use(express.json());

// --- Routes ---
app.use('/api/auth', authRoutes);

// --- Socket.io ---

io.use(authSocket); // (Unchanged)

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.user.username} (ID: ${socket.id})`);

  // Handle joining a room
  socket.on('joinRoom', async (room) => {
    socket.join(room);
    console.log(`${socket.user.username} joined room: ${room}`);

    // Load chat history using Prisma
    try {
      const messages = await prisma.message.findMany({
        where: { room },
        orderBy: { createdAt: 'asc' },
        include: { // Join with the User model
          user: {
            select: { username: true } // Only select the username
          }
        }
      });

      const history = messages.map(msg => ({
        content: msg.content,
        username: msg.user.username,
        createdAt: msg.createdAt
      }));

      socket.emit('loadHistory', history);

    } catch (err) {
      console.error(err);
    }
  });

  socket.on('chatMessage', async (data) => {
    const { room, content } = data;

    try {
      // Save the message to MySQL using Prisma
      const msg = await prisma.message.create({
        data: {
          content: content,
          room: room,
          userId: socket.user.id // Get user ID from authenticated socket
        }
      });
      
      const messageData = {
        content: msg.content,
        username: socket.user.username, // Get username from socket
        createdAt: msg.createdAt
      };
      
      io.to(room).emit('chatMessage', messageData);

    } catch (err) {
      console.error(err);
    }
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.user.username}`);
  });
});

// --- Start Server ---
const PORT = process.env.PORT || 3001; // Use 3001 to avoid conflict with React
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
