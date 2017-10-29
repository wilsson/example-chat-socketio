let socket = io('http://localhost:8080');
let form = document.getElementById('form');

socket.on('messages', (data) => {
    console.log('mi data >', data);
    render(data);
});

function render(data){
    var html = data.map((data) => {
        return(
            `<div>
                <strong>${data.author}</strong>:
                <em>${data.text}</em>
            </div>`
        )
    }).join(' ');
    document.getElementById('messages').innerHTML = html;
}

form.addEventListener('submit', (e) => {
    var payload = {
        author: document.getElementById('username').value,
        text: document.getElementById('text').value
    };
    socket.emit('new-message', payload);
    e.preventDefault();
});