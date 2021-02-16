const socket = io();

const chatMessages = document.querySelector('.msgs');
const chatForm = document.getElementById('form-msg');
var username;
chatForm.addEventListener('submit', e=>{
    e.preventDefault();
    if(e.target.msg.value.length > 256)
    {
        alert('Nachricht zu groß!');
        return;
    }
    username = document.getElementById('name').value;
    if(username==='')
    {
        alert('\"Senden als\" bitte ausfüllen');
        return;
    }
    socket.emit('msgSend', username.concat(':  ' + e.target.msg.value));
    newMsg(username.concat(':  ' + e.target.msg.value));
    e.target.msg.value = '';
});
socket.on('newMsg', newMsg);

function newMsg(msg, me)
{
    const p = document.createElement('p');
    p.append(msg);
    p.classList.add('msg');
    
    window.console.log(msg);
    document.querySelector('.msgs').appendChild(p);
     // Scroll down
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

