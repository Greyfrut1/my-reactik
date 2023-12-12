// src/App.js
import React, { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';
const PORT = import.meta.env.VITE_SERVER_PORT;
 // Адреса вашого сервера
const currentDomain = window.location.hostname;
const currentProtocol = window.location.protocol
const ENDPOINT = `${currentProtocol}//${currentDomain}:${PORT}`;
function OnlineUserCounter() {
    const [onlineUsers, setOnlineUsers] = useState(0);

    useEffect(() => {
        const socket = socketIOClient(ENDPOINT);

        socket.on('updateUsers', (users) => {
            setOnlineUsers(users);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <div>
            <h1>React App with Real-time User Count</h1>
            <p>Current online users: {onlineUsers}</p>
        </div>
    );
}

export default OnlineUserCounter;
