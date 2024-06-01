import React, { useState, useEffect } from 'react';
import { Input, Button, List, Typography, Tag } from 'antd';
import ws_middleware from '../middleware/ws_middleware';

const jwt_decode = require('jwt-decode');

const { Text } = Typography;

const AdminDashboard = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [webSocketClient, setWebSocketClient] = useState(null);
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Get the JWT token from localStorage
    const jwtToken = localStorage.getItem('jwt');
    if (jwtToken) {
      // Decode the JWT token to get the user ID
      const decoded = jwt_decode.jwtDecode(jwtToken);
      setUserId(decoded.sub);
    }

    // Initialize the WebSocket client
    const client = new ws_middleware.WebSocketClient();
    client.connect();
    setWebSocketClient(client);

    // Handle incoming messages
    client.ws.onmessage = (event) => {
      try {
        const parsedMessage = JSON.parse(event.sender);
        if (parsedMessage.sender !== userId) {
          setMessages((prevMessages) => [...prevMessages, parsedMessage]);
        }

        // Handle different message types
        if (parsedMessage.type === 'newClient') {
          // New client connected
          setConnectedUsers((prevConnectedUsers) => [...prevConnectedUsers, parsedMessage.clientId]);
        } else if (parsedMessage.type === 'clientDisconnected') {
          // Client disconnected
          setConnectedUsers((prevConnectedUsers) =>
            prevConnectedUsers.filter((userId) => userId !== parsedMessage.clientId)
          );
        } else if (parsedMessage.type === 'message') {
          // New message received
          // Check if the sender is a new user
          if (!connectedUsers.includes(parsedMessage.sender)) {
            setConnectedUsers((prevConnectedUsers) => [...prevConnectedUsers, parsedMessage.sender]);
          }
        }
      } catch (error) {
        console.error('Error parsing message:', error);
      }
    };

    // Clean up the socket connection on component unmount
    return () => {
      client.disconnect();
    };
  }, [connectedUsers, userId]);

  const handleSendMessage = () => {
    if (newMessage.trim() !== '' && webSocketClient) {
      const messageObj = {
        type: 'text',
        id: Date.now(),
        text: newMessage,
        sender: userId, // Use the actual sender ID
      };
      webSocketClient.sendMessage(JSON.stringify(messageObj));
      setNewMessage('');
    }
  };

  return (
    <div style={{ padding: '24px' }}>
      <h1>Admin Dashboard</h1>
      <div style={{ marginBottom: '24px' }}>
        <Text>Connected Users:</Text>{' '}
        {connectedUsers.map((userId) => (
          <Tag key={userId} style={{ marginRight: '8px' }}>
            User {userId}
          </Tag>
        ))}
      </div>
      <List
        dataSource={messages}
        renderItem={(message) => (
          <List.Item>
            <Text strong>{`Sender ${message.sender}:`}</Text> {message.text}
          </List.Item>
        )}
        style={{ marginBottom: '24px' }}
      />
      <Input.Group compact>
        <Input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          style={{ width: 'calc(100% - 100px)' }}
        />
        <Button type="primary" onClick={handleSendMessage}>
          Send
        </Button>
      </Input.Group>
    </div>
  );
};

export default AdminDashboard;