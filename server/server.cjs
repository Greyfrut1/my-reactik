// server/server.cjs
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');


const app = express();
app.use(cors({ origin: 'https://my-reactik.vercel.app/' }));


const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'https://my-reactik.vercel.app/',
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
