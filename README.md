# 💬 Real-Time Chat Application

A full-stack real-time chat application built with React, Node.js, Socket.io, and Prisma.

## 🚀 Features

- **Real-time messaging** with Socket.io
- **User authentication** with JWT tokens
- **Multiple chat rooms** (general, random, tech, gaming)
- **Message persistence** with SQLite database
- **Responsive design** for all devices
- **Professional UI** with modern styling

## 🛠️ Tech Stack

### Frontend
- **React** - UI framework
- **Socket.io-client** - Real-time communication
- **Axios** - HTTP requests
- **CSS3** - Styling

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Socket.io** - Real-time communication
- **Prisma** - Database ORM
- **JWT** - Authentication
- **bcryptjs** - Password hashing

### Database
- **SQLite** - Database

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd chat-application
```

2. **Install backend dependencies**
```bash
cd chat-backend
npm install
```

3. **Set up the database**
```bash
npx prisma generate
npx prisma migrate dev --name init
```

4. **Start the backend server**
```bash
npm start
```

5. **Install frontend dependencies**
```bash
cd ../chat-frontend
npm install
```

6. **Start the frontend**
```bash
npm start
```

7. **Open your browser**
Navigate to `http://localhost:3000`

## 📱 Usage

1. **Register** a new account or **login** with existing credentials
2. **Select a chat room** from the sidebar
3. **Start chatting** in real-time with other users
4. **Switch between rooms** to join different conversations

## 🔧 API Endpoints

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

## 🏗️ Project Structure

```
chat-application/
├── chat-backend/
│   ├── src/
│   │   ├── config/
│   │   ├── middleware/
│   │   └── routes/
│   ├── prisma/
│   └── server.js
└── chat-frontend/
    ├── src/
    │   ├── components/
    │   └── App.js
    └── public/
```

## 🎯 Key Learning Outcomes

- **Full-stack development** with modern technologies
- **Real-time communication** implementation
- **Database design** and ORM usage
- **Authentication** and security practices
- **Responsive UI/UX** design
- **API development** and integration

## 🔮 Future Enhancements

- [ ] File sharing capabilities
- [ ] Emoji reactions
- [ ] Message search functionality
- [ ] User presence indicators
- [ ] Push notifications
- [ ] Message encryption

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Developer

**Your Name** - Full Stack Developer
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)
- Email: your.email@example.com
