import React, { useState, useEffect } from 'react';

const ChatRoom = ({ currentUser }) => {
    const [messages, setMessages] = useState([]);
    const [webSocket, setWebSocket] = useState(null);

    useEffect(() => {
        const socket = new WebSocket('ws://localhost:8080/ws'); // Replace with your WebSocket server URL

        socket.onopen = () => {
            console.log('WebSocket connection established.');
            setWebSocket(socket);
        };

        socket.onmessage = event => {
            const messageData = JSON.parse(event.data);
            setMessages(prevMessages => [...prevMessages, messageData]);
        };

        socket.onclose = () => {
            console.log('WebSocket connection closed.');
        };

        return () => {
            if (socket) {
                socket.close();
            }
        };
    }, []);

    const sendMessage = message => {
        if (webSocket) {
            const messageObject = {
                sender: currentUser,
                content: message
            };
            webSocket.send(JSON.stringify(messageObject));
        }
    };

    return (
        <div>
            <div className="message-list">
                {messages.map((message, index) => (
                    <div key={index} className="message">
                        <strong>{message.sender}: </strong>
                        {message.content}
                    </div>
                ))}
            </div>
            <input
                type="text"
                placeholder="Type your message..."
                onKeyDown={event => {
                    if (event.key === 'Enter') {
                        sendMessage(event.target.value);
                        event.target.value = '';
                    }
                }}
            />
        </div>
    );
};

export default ChatRoom;
