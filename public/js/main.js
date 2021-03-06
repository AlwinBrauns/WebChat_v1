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
    gifURL: "",
};

chatForm.addEventListener('submit', e=>{
    e.preventDefault();
    if(gfiles){
        chatBlock.file = previewCanvas.getContext('2d').getImageData(0,0,previewCanvas.width, previewCanvas.height);
        chatBlock.imgWidth = previewCanvas.width;
        chatBlock.imgHeight = previewCanvas.height;
    }
    chatBlock.gifURL = document.getElementById('gif-url').value;
    chatBlock.date = new Date();
    chatBlock.username = document.getElementById('name').value;
    if(chatBlock.username=='')
    {
        alert('\"Senden als\" bitte ausfüllen');
        return;
    }
    chatBlock.message = e.target.msg.value;
    window.console.log(chatBlock);
    try{
        socket.emit('msgSend', chatBlock);
    }catch(e){
        alert(e);
    }
    e.target.msg.value = '';
    chatBlock.file = null;
    gfiles = null;
});

function newMsg(msg, me)
{
    let isMe = me;
    const p = document.createElement('p');
    const d = document.createElement('div');
    const c = document.createElement('canvas');
    const gif = document.createElement('img');
    
    gif.src = msg.gifURL;
    p.append((msg.username + ": " + msg.message));
    if(msg.file?.data)
    {
        c.height = msg.imgHeight;
        c.width = msg.imgWidth;
        let ctx = c.getContext('2d');
        c.classList.add('img-in-chat');
        let array = new Uint8ClampedArray(msg.file.data);
        let imgData = new ImageData(array,msg.imgWidth,msg.imgHeight);
        ctx.putImageData(imgData,0,0);
        p.appendChild(c);
    }
    gif.classList.add('img-in-chat');
    p.appendChild(gif);
    
    p.classList.add('msg');
    if(isMe){
        p.classList.add('make-right');
        if(msg.file?.data)
            c.classList.add('make-right');
    }

    ovl = document.createElement('div');
    ovl.classList.add('darkOvl');
    c.addEventListener('click', e=>{
        if(c.classList.contains("center")){
            document.body.removeChild(ovl);
            c.classList.remove("center");
        }else{
            c.classList.add("center");
            ovl.id="current-ovl";
            document.body.appendChild(ovl);
        }
    });
    ovl.addEventListener('click', e=>{
        document.body.removeChild(document.getElementById("current-ovl"));
        document.body.getElementsByClassName("center")[0].classList.remove("center");
    });
    d.classList.add('msglayer');


    let urls = detectURLs(msg.message);
    if(urls){
        for(var i = 0; i < urls.length;i++){
            
        let oldurl = urls[i];
        if(!urls[i].match('^https?:\/\/')) {
            urls[i] = 'http://' + urls[i];
        }
        p.innerHTML = p.innerHTML.replace(oldurl, "<a href=\""+urls[i]+"\" target=\"_blank\" >"+urls[i]+"</a>");
        
        }
    }


    d.appendChild(p);
    window.console.log(msg);
    chatMessages.appendChild(d);
    // Scroll down
    chatMessages.scrollTop = chatMessages.scrollHeight;
    hiddenInput.files = undefined;
    if(document.getElementById('img-pre').hasChildNodes())
    {
        document.getElementById('img-pre').removeChild(previewCanvas);
    }
    document.getElementById('gif-url').value = "";
}

function msgToLong(msg){
    alert("Deine Nachricht ist zu Lang!\n\n" + msg.message);
}

function detectURLs(message) {
    var urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
    return message.match(urlRegex)
  }