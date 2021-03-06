let droparea = document.getElementById('image-drop-area');

let hiddenInput = document.createElement('input');
let previewCanvas = document.createElement('canvas');

let gfiles = null;


hiddenInput.type = "file";
hiddenInput.accept = "image/*";
droparea.addEventListener('click', function() {
    hiddenInput.click();
});

hiddenInput.addEventListener('change', function(){
    var files = hiddenInput.files;
    handleFiles(files);
})

function addPicToPreview(files){
    gfiles = files;
    var file = files[0],
    url = URL.createObjectURL(file),
    img = new Image();

    img.onload = function(){
        URL.revokeObjectURL(this.src);
        previewCanvas.width = img.width;
        previewCanvas.height = img.height;
        previewCanvas.getContext('2d').drawImage(this, 0,0);
    }

    img.src = url;
}

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
    window.console.log(e);
    let files = data.files;
 
    handleFiles(files);    
}

function handleFiles(file){
    addPicToPreview(file);
    previewCanvas.classList.add('img-preview');
    document.getElementById('img-pre').appendChild(previewCanvas);
    window.console.log(file);
}
