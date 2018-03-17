const image = new Image();
var oldCanvas = null;
let webGlCanvas;
const editor = document.querySelector('.editor');
console.log(editor);
const holder = document.querySelector('.image-holder');
document.getElementById('submit').addEventListener('click',(evt)=>{
    editor.style.display = "flex";
    let file = document.getElementById('image-file').files[0];
    let url = window.URL.createObjectURL(file);
    document.querySelector('.image-loader').style.position = "fixed";
    document.querySelector('.image-loader').style.bottom = "0";
    document.querySelector('.image-loader').style.right = "0";
    document.querySelector('.image-loader').style.margin = "0px";
    image.crossOrigin = "anonymous";
    image.src = url;
    if(document.getElementById("drawCanvas"))
        holder.removeChild(document.getElementById("drawCanvas"));
    document.getElementById('image-file').value = "";
});
image.onload = _=>{
    const canvas = document.createElement('canvas');
    canvas.id = 'drawCanvas';
    holder.appendChild(canvas);
    webGlCanvas = new WebGLCanvas(canvas);
    webGlCanvas.redraw(image);
    document.getElementById('articlbl').addEventListener('click',(evt)=>{
        console.log("click");
        webGlCanvas.drawArticFilter();
    });
    document.getElementById('saharalbl').addEventListener('click',(evt)=>{
        console.log("click");
        webGlCanvas.drawSaharaFilter();
    });
    document.getElementById('vintagelbl').addEventListener('click',(evt)=>{
        console.log("click");
        webGlCanvas.drawVintageFilter();
    });
    document.getElementById('glowlbl').addEventListener('click',(evt)=>{
        console.log("click");
        webGlCanvas.drawGlowFilter();
    });
    document.getElementById('nonelbl').addEventListener('click',(evt)=>{
        console.log("click");
        webGlCanvas.drawNone();
    });
    document.getElementById('funklbl').addEventListener('click',(evt)=>{
        webGlCanvas.drawOtyFilter();
    });
    document.getElementById('devillbl').addEventListener('click',(evt)=>{
        webGlCanvas.drawDevilFilter();
    });
};