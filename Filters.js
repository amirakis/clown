let Width;
let Height;
let faceTracker;
let userVideo;
let Mask;
let Face;
let selected = -1;        //по умолчанию без фильтра


function preload(){    //выполняется после загрузки библиотеки или рисовки
    Mask = loadImage("https://img.icons8.com/emoji/48/000000/glasses-emoji.png");
    Face = loadImage("https://cdn.discordapp.com/emojis/749942231988961341.png?size=60");

}
function setup(){    //выполняется после preload один раз
    const maxWidth = Math.min(windowWidth, windowHeight);
    pixelDensity(1);
    Height = maxWidth * 0.7;
    Width = maxWidth;

    createCanvas(Width, Height);
    userVideo = createCapture(VIDEO);
    userVideo.size(Width, Height);
    userVideo.hide();

    const userSelect = createSelect();
    const listSelect = ['Маска 1','Маска 2']
    userSelect.option('Выбери маску', -1);

    for(let i = 0; i < listSelect.length; i++){
        userSelect.option(listSelect[i],i);
    }
    userSelect.changed(applyMask);

    faceTracker = new clm.tracker();
    faceTracker.init();
    faceTracker.start(userVideo.elt);
}

function applyMask(){
    selected = this.selected();
}

function draw(){
    image(userVideo, 0, 0, Width, Height);

    switch (selected){
        case '-1': break;
        case '0' : drawMask(); break;
        case '1' : drawFace(); break;
    }
}

function drawMask(){
    const positions = faceTracker.getCurrentPosition();
    if(positions !== false){
        push();
        const a = Math.abs(positions[13][0] - positions[1][0]) * 1.2;  //size
        const b = Math.abs(positions[7][1] - Math.min(positions[16][0], positions[20][1])) * 1.2;  //size
        translate(-a / 2, -b / 2);
        image(Mask, positions[33][0], positions[33][1], a, b);
        pop();
    }
}

function drawFace(){
    const positions = faceTracker.getCurrentPosition();
    if(positions !== false){
        push();
        const a = Math.abs(positions[13][0] - positions[1][0]) * 1.2;  //size
        const b = Math.abs(positions[7][1] - Math.min(positions[16][0], positions[20][1])) * 1.2; //size
        translate(-a / 2, -b / 2);
        image(Face, positions[37][0], positions[37][1], a, b);
        pop();
    }
}



function windowResize(){
    const maxWidth = Math.min(Width, Height);
    pixelDensity(1);
    Height = maxWidth * 1;
    Width = maxWidth;
    resizeCanvas(Width, Height);
}