const bgColorInput = document.getElementById('color-bg');
const bgAltColorInput = document.getElementById('color-bg-alt');
const fontColorInpute = document.getElementById('color-font');

function updateColorPanels(){
    const bgColor = getComputedStyle(document.body).getPropertyValue("--main-bg-color");
    const bgAltColor = getComputedStyle(document.body).getPropertyValue("--main-bg-alt-color");
    const fontColor = getComputedStyle(document.body).getPropertyValue("--main-font-color");
    bgColorInput.value = bgColor.substr(1, bgColor.length);
    bgAltColorInput.value = bgAltColor.substr(1, bgColor.length);
    fontColorInpute.value = fontColor.substr(1, bgColor.length);
}

bgColorInput.addEventListener('change', e=>{
    document.documentElement.style.setProperty("--main-bg-color", e.target.value);
});
bgAltColorInput.addEventListener('change', e=>{
    document.documentElement.style.setProperty("--main-bg-alt-color", e.target.value);
});
fontColorInpute.addEventListener('change', e=>{
    document.documentElement.style.setProperty("--main-font-color", e.target.value);
});

updateColorPanels();