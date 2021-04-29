const socket = io();

const chatMessages = document.querySelector('.msgs');
const chatForm = document.getElementById('form-msg');
socket.on('newMsg', newMsg);

chatBlock = {
    username: "",
    message: "",
    date: new Date(),
};

chatForm.addEventListener('submit', e=>{
    e.preventDefault();
    chatBlock.date = new Date();
    chatBlock.username = document.getElementById('name').value;
    if(chatBlock.username=='')
    {
        alert('\"Senden als\" bitte ausfüllen');
        return;
    }
    chatBlock.message = e.target.msg.value
    if((chatBlock.username + chatBlock.message + chatBlock.date.toString()).length > 1024)
    {
        alert('Nachricht zu groß!');
        return;
    }
    socket.emit('msgSend', chatBlock);
    e.target.msg.value = '';
});

function newMsg(msg)
{
    window.console.log(msg);
    const p = document.createElement('p');
    p.append((msg.username + ": " + msg.message));
    p.classList.add('msg');
    
    window.console.log(msg);
    chatMessages.appendChild(p);
    // Scroll down
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

