let express = require('express');
let app = express();
let server = require('http').createServer(app)
let io = require('socket.io')(server);

let messages = [];
app.use(express.static('./public'));

io.on('connection', (socket) => {
    console.log('socket connection', socket.id);

    socket.emit('messages', messages);
    socket.on('new-message', (data) => {
        messages.push(data);
        io.sockets.emit('messages', messages);
    });

    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', data);
    });
});

server.listen(8080, () => {
    console.log('listen in localhost:8080');
});