import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import './Chat.css';

const Chat = ({ token, username, onLogout }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [room, setRoom] = useState('general');
  const [socket, setSocket] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Connect to Socket.io server
    const newSocket = io('http://localhost:3001', {
      auth: { token: token }
    });

    newSocket.on('connect', () => {
      newSocket.emit('joinRoom', room);
    });

    newSocket.on('loadHistory', (history) => {
      setMessages(history);
    });

    newSocket.on('chatMessage', (messageData) => {
      setMessages(prev => [...prev, messageData]);
    });

    setSocket(newSocket);
    return () => newSocket.close();
  }, [token, room]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && socket) {
      socket.emit('chatMessage', { room, content: message.trim() });
      setMessage('');
    }
  };

  const handleRoomChange = (newRoom) => {
    if (socket && newRoom !== room) {
      socket.emit('joinRoom', newRoom);
      setRoom(newRoom);
      setMessages([]);
    }
  };

  return (
    <div className="chat-app">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="user-info">
          <h3>Welcome, {username}!</h3>
          <button onClick={onLogout} className="logout-btn">Logout</button>
        </div>
        
        <div className="rooms">
          <h4>Rooms</h4>
          {['general', 'random', 'tech', 'gaming'].map(roomName => (
            <button
              key={roomName}
              className={`room-btn ${room === roomName ? 'active' : ''}`}
              onClick={() => handleRoomChange(roomName)}
            >
              #{roomName}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="chat-main">
        <div className="chat-header">
          <h2>#{room}</h2>
        </div>

        <div className="messages-container">
          <div className="messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.username === username ? 'own' : ''}`}>
                <div className="message-content">
                  <div className="message-header">
                    <span className="username">{msg.username}</span>
                    <span className="time">{new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                  <div className="message-text">{msg.content}</div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="message-form">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={`Message #${room}...`}
            className="message-input"
          />
          <button type="submit" className="send-btn">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Chat;