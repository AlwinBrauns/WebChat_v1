const socket = io();

const chatMessages = document.querySelector('.msgs');
const chatForm = document.getElementById('form-msg');

socket.on('newMsg', newMsg);
socket.on('msgToLong', msgToLong);

chatBlock = {
    username: "",
    message: "",
    date: new Date(),
    file: null,
    imgWidth: 0,
    imgHeight: 0,
};

chatForm.addEventListener('submit', e=>{
    e.preventDefault();
    if(hiddenInput.files[0]){
        chatBlock.file = previewCanvas.getContext('2d').getImageData(0,0,previewCanvas.width, previewCanvas.height);
        chatBlock.imgWidth = previewCanvas.width;
        chatBlock.imgHeight = previewCanvas.height;
    }
    chatBlock.date = new Date();
    chatBlock.username = document.getElementById('name').value;
    if(chatBlock.username=='')
    {
        alert('\"Senden als\" bitte ausfüllen');
        return;
    }
    chatBlock.message = e.target.msg.value;
    window.console.log(chatBlock.file);
    socket.emit('msgSend', chatBlock);
    e.target.msg.value = '';
});

function newMsg(msg, me)
{
    let isMe = me;
    const p = document.createElement('p');
    const d = document.createElement('div');
    const c = document.createElement('canvas');
    p.append((msg.username + ": " + msg.message));
    if(msg.file?.data)
    {
        let ctx = c.getContext('2d');
        c.classList.add('img-in-chat');
        let array = new Uint8ClampedArray(msg.file.data);
        let imgData = new ImageData(array,msg.imgWidth,msg.imgHeight);
        ctx.putImageData(imgData,0,0);
        p.appendChild(c);
    }

    p.classList.add('msg');
    if(isMe){
        p.classList.add('make-right');
        if(msg.file?.data)
            c.classList.add('make-right');
    }
    d.classList.add('msglayer');
    d.appendChild(p);
    window.console.log(msg);
    chatMessages.appendChild(d);
    // Scroll down
    chatMessages.scrollTop = chatMessages.scrollHeight;
    hiddenInput.files = undefined;
    if(document.getElementById('img-pre'))
        document.getElementById('img-pre').removeChild(previewCanvas);
}

function msgToLong(msg){
    alert("Deine Nachricht ist zu Lang!\n\n" + msg.message);
}

