// connection
let socket = io('http://localhost:8080');

// catch DOM
let btnSend = document.getElementById('btn-send');
let txtName = document.getElementById('username');
let txtMessage = document.getElementById('text');
let feedback = document.getElementById('feedback');

// events
btnSend.addEventListener('click', (evt) => {
    let payload = {
        name: txtName.value,
        message: txtMessage.value
    };
    socket.emit('new-message', payload);
});

txtMessage.addEventListener('keypress', (evt) => {
    socket.emit('typing', txtName.value);
});

socket.on('messages', (data) => {
    feedback.innerHTML = '';
    render(data);
});

function render(data){
    var html = data.map((data) => {
        return(
            `<div>
                <strong>${data.name}</strong>:
                <em>${data.message}</em>
            </div>`
        )
    }).join(' ');
    document.getElementById('messages').innerHTML = html;
}

socket.on('typing', (data) => {
    feedback.innerHTML = data + ' is typing...';
});