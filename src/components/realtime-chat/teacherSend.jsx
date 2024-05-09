import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import io from 'socket.io-client';
const TeacherMessageSender = () => {
    const { studentId } = useParams(); 
    const [content, setContent] = useState('');
    const socket = io('https://backendexpressjs-2.onrender.com');
  
    const sendMessage = async () => {
      try {
        await axios.post('https://backendexpressjs-2.onrender.com/api/messages/send-message', {
          senderId: localStorage.getItem('id'), 
          recipientId: studentId, 
          content
        });
        // Clear the input fields after sending the message
        setContent('');
      } catch (error) {
        console.error('Error sending message:', error);
      }
    };
  
    useEffect(() => {
      console.log('Socket connecting...');
      // Emit messages to the studentId room
      socket.emit(studentId, 'Hello from teacher');
  
      // Listen for incoming messages from the student on the studentId room
      socket.on(studentId, (message) => {
        console.log('Received message from student:', message);
      });
  
      return () => {
        console.log('Socket disconnecting...');
        socket.disconnect();
      };
    }, [studentId]); // Make sure to include studentId in the dependency array
  
    const handleSubmit = (e) => {
      e.preventDefault();
      sendMessage();
    };
  
  
  return (
    <>
      <br />
      <br />
      <br />
      <br />
      <br />
      <div>
        <h2>Send Message to Student</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Recipient ID:</label>
            {/* Display the studentId obtained from useParams */}
            <input
              type="text"
              value={studentId} // Use studentId directly
              disabled // Disable editing the studentId
            />
          </div>
          <div>
            <label>Message:</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <button type="submit">Send</button>
        </form>
      </div>
    </>
  );
};

export default TeacherMessageSender;
