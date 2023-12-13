// server/server.cjs
require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const domain = process.env.VITE_FRONTEND_URL
console.log(domain)

const app = express();
app.use(cors({ origin: domain }));


const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: domain,
        methods: ['GET', 'POST']
    }
});

let onlineUsers = 0;

io.on('connection', (socket) => {
    onlineUsers++;
    io.emit('updateUsers', onlineUsers);

    socket.on('disconnect', () => {
        onlineUsers--;
        io.emit('updateUsers', onlineUsers);
    });
});

const PORT = process.env.VITE_SERVER_PORT || 5178;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});