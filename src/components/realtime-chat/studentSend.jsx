import React, { useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';

const StudentMessageReplier = () => {
  const [content, setContent] = useState('');
  const socket = io('https://backendexpressjs-2.onrender.com');

  const replyMessage = async () => {
    try {
      await axios.post('https://backendexpressjs-2.onrender.com/api/messages/send-message', {
        senderId: localStorage.getItem('id'), 
        recipientId: "662168da82cc402d546d57ee", 
        content
      });
      // Clear the input field after replying to the message
      setContent('');
    } catch (error) {
      console.error('Error replying to message:', error);
    }
  };

  useEffect(() => {
    console.log('Socket connecting...');
    // Listen for incoming messages from the teacher
    socket.on('message', (message) => {
      // Handleincoming messages here
      console.log('Received message from teacher:', message);
    });

    return () => {
      console.log('Socket disconnecting...');
      socket.disconnect();
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    replyMessage();
  };

  return (
    <>
    <br />
    <br />
    <br />
    <br />
    <br />
    <div>
      <h2>Reply to Teacher</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Message:</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <button type="submit">Send Reply</button>
      </form>
    </div>
    </>
  );
};

export default StudentMessageReplier;
