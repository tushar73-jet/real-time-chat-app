
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


app.use(cors()); 
app.use(express.json());


app.use('/api/auth', authRoutes);


io.use(authSocket); 

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.user.username} (ID: ${socket.id})`);


  socket.on('joinRoom', async (room) => {
    socket.join(room);
    console.log(`${socket.user.username} joined room: ${room}`);


    try {
      const messages = await prisma.message.findMany({
        where: { room },
        orderBy: { createdAt: 'asc' },
        include: { 
          user: {
            select: { username: true } 
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
      const msg = await prisma.message.create({
        data: {
          content: content,
          room: room,
          userId: socket.user.id 
        }
      });
      
      const messageData = {
        content: msg.content,
        username: socket.user.username,
        createdAt: msg.createdAt
      };
      
      io.to(room).emit('chatMessage', messageData);

    } catch (err) {
      console.error(err);
    }
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.user.username}`);
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
