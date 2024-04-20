import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const socket = io('http://localhost:3000'); // Replace with your server URL

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/messages/get-all');
        const sortedMessages = response.data.map(message => ({
          ...message,
          timestamp: new Date(message.timestamp) // Convert timestamp to Date object
        })).sort((a, b) => a.timestamp - b.timestamp);
        setMessages(sortedMessages);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();

    socket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, {
        ...message,
        timestamp: new Date(message.timestamp) // Convert timestamp to Date object
      }]);
    });

    return () => {
      socket.off('message');
    };
  }, []);

  const sendMessage = async () => {
    const newMessage = {
      senderId: localStorage.getItem('email'), 
      content: input,
    };
    console.log(newMessage);
    await axios.post('http://localhost:3000/api/messages/send-message', newMessage);

    socket.emit('message', newMessage);
    const response = await axios.get('http://localhost:3000/api/messages/get-all');
    const sortedMessages = response.data.map(message => ({
      ...message,
      timestamp: new Date(message.timestamp) // Convert timestamp to Date object
    })).sort((a, b) => a.timestamp - b.timestamp);
    setMessages(sortedMessages);
        setInput('');
  };

  const formatDate = (timestamp) => {
    const options = { 
      hour12: false, 
      hour: 'numeric', 
      minute: 'numeric', 
      second: 'numeric', 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric' 
    };
    return timestamp.toLocaleString('en-US', options);
  };

  return (
    <div 
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: '100vh',
        background: '#f8f8f8',
        padding: '20px',
      }}
    >
      <div 
        style={{
          width: '400px',
          height: '500px',
          overflowY: 'scroll',
          border: '1px solid #ddd',
          borderRadius: '10px',
          padding: '10px',
          marginBottom: '20px',
          background: '#fff',
        }}
      >
        {messages.map((message, index) => (
          <div 
            key={index}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: message.senderId === localStorage.getItem('email') ? 'flex-end' : 'flex-start',
              marginBottom: '10px',
            }}
          >
            <div 
              style={{
                background: message.senderId === localStorage.getItem('email') ? '#007bff' : '#f4f4f8',
                color: message.senderId === localStorage.getItem('email') ? '#fff' : '#333',
                padding: '8px',
                borderRadius: '5px',
                marginBottom: '5px',
                maxWidth: '80%',
                wordWrap: 'break-word',
              }}
            >
              {message.content}
            </div>
            <div
              style={{
                color: '#888',
                fontSize: '12px',
              }}
            >
              {formatDate(message.timestamp)}
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{
            width: '300px',
            padding: '8px',
            marginRight: '10px',
            borderRadius: '5px',
            border: '1px solid #ddd',
          }}
        />
        <button
          onClick={sendMessage}
          style={{
            padding: '8px 16px',
            borderRadius: '5px',
            border: 'none',
            background: '#007bff',
            color: '#fff',
            cursor: 'pointer',
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;