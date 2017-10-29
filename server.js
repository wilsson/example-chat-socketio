var express = require('express');
var app = express();
var server = require('http').createServer(app)
var io = require('socket.io')(server);

var messages = [{
    author: 'wilson',
    text: 'message of wilson'
}]

app.use(express.static('./public'));
app.get('/', (req, res) => {
    res.status(200).send('hola mundo a');
})

io.on('connection', (socket) => {
    socket.emit('messages', messages);
    socket.on('new-message', (data) => {
        messages.push(data);
        io.sockets.emit('messages', messages);
    });
});

server.listen(8080, () => {
    console.log('listen in localhost:8080');
})