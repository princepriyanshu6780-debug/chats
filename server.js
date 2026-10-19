const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// 'public' folder ki files serve karein
app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('Ek user connect hua');

    // Jab koi message bheje
    socket.on('chat message', (data) => {
        // Message ko sabhi connected users ko bhej dein
        io.emit('chat message', data);
    });

    socket.on('disconnect', () => {
        console.log('User disconnect ho gaya');
    });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server chal raha hai: http://localhost:${PORT}`);
});