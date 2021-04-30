let droparea = document.getElementById('image-drop-area');

let hiddenInput = document.createElement("input");

let info = document.createElement('p');


hiddenInput.type = "file";
hiddenInput.accept = "image/*";
droparea.addEventListener('click', function() {
    hiddenInput.click();
});

hiddenInput.addEventListener('change', function(){
    var files = hiddenInput.files;
    handleFiles(files[0]);
})

droparea.addEventListener('dragenter', preventDefault,false);
droparea.addEventListener('dragleave', preventDefault,false);
droparea.addEventListener('dragover', preventDefault,false);
droparea.addEventListener('drop', preventDefault,false);

droparea.addEventListener('dragleave', unhighlight);
droparea.addEventListener('dragover', highlight);
droparea.addEventListener('drop', unhighlight);
droparea.addEventListener('dragenter', unhighlight);

function highlight(){
    droparea.classList.add('highlight');
}

function unhighlight(){
    droparea.classList.remove('highlight');
}

function preventDefault(e) {
    e.preventDefault();
    e.stopPropagation();
}
 
droparea.addEventListener('drop', handleDrop, false);

function handleDrop(e) {
    let data = e.dataTransfer;
    let files = data.files;
 
    handleFiles(files[0]);    
}

function handleFiles(file){
    info.append('Bild hinzugefügt');
    droparea.appendChild(info);
    window.console.log(file);
}
