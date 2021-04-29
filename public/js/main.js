const socket = io();

const chatMessages = document.querySelector('.msgs');
const chatForm = document.getElementById('form-msg');
socket.on('newMsg', newMsg);
socket.on('msgToLong', msgToLong);

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
    socket.emit('msgSend', chatBlock);
    e.target.msg.value = '';
});

function newMsg(msg, me)
{
    let isMe = me;

    window.console.log(msg);
    const p = document.createElement('p');
    const d = document.createElement('div');
    p.append((msg.username + ": " + msg.message));
    p.classList.add('msg');
    if(isMe){
        p.classList.add('make-right');
    }
    d.classList.add('msglayer');
    d.appendChild(p);
    window.console.log(msg);
    chatMessages.appendChild(d);
    // Scroll down
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function msgToLong(msg){
    alert("Deine Nachricht ist zu Lang!\n\n" + msg.message);
}

