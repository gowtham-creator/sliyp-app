import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ChatRoom = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [webSocket, setWebSocket] = useState(null);

    const connectWebSocket = () => {
        const ws = new WebSocket('ws://localhost:8080/ws/chat');
        ws.onmessage = (event) => {
            const receivedMessage = event.data;
            setMessages([...messages, receivedMessage]);
        };
        setWebSocket(ws);
    };

    const disconnectWebSocket = () => {
        if (webSocket) {
            webSocket.close();
        }
    };

    const sendMessage = () => {
        if (webSocket && message.trim() !== '') {
            webSocket.send(message);
            setMessage('');
        }
    };

    useEffect(() => {
        fetchMessages();
        connectWebSocket();
        return () => disconnectWebSocket();
    }, []);

    const fetchMessages = async () => {
        const response = await axios.get('/chat/messages');
        setMessages(response.data);
    };

    return (
        <div>
            <div className="message-list">
                {messages.map((msg, index) => (
                    <div key={index} className="message">
                        {msg}
                    </div>
                ))}
            </div>
            <div className="message-input">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
};

export default ChatRoom;
