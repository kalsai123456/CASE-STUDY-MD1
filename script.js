let canvas = document.getElementById("canvasSnake");
let ctxSnake = document.getElementById("canvasSnake").getContext("2d");
let ctxFood = document.getElementById("canvasFood").getContext("2d");
let ctxHex = document.getElementById("canvasHex").getContext("2d");
let ut = new Util();
let mouseDown = false,
    cursor = new Point(0, 0); //con trỏ
let game = new Game(ctxSnake, ctxFood, ctxHex);

canvas.onmousemove = function(e){
    if(mouseDown){
        cursor = ut.getMousePos(canvas, e);
        let ang = ut.getAngle(game.snakes[0].arr[0], cursor);
        game.snakes[0].changeAngle(ang);
    }
}

canvas.onmousedown = function(e){
    mouseDown = true;
}

canvas.onmouseup = function(e){
    mouseDown = false;
}

function start(){
    game.init();
    update();
}


let updateId,
    previousDelta = 0,
    fpsLimit = 20;
function update(currentDelta){
    updateId = requestAnimationFrame(update);
    let delta = currentDelta - previousDelta;  //
    if (fpsLimit && delta < 1000 / fpsLimit) return;
    previousDelta = currentDelta;

    //clear all
    ctxFood.clearRect(0, 0, canvas.width, canvas.height);
    ctxSnake.clearRect(0, 0, canvas.width, canvas.height);
    ctxHex.clearRect(0, 0, canvas.width, canvas.height);

    //draw all
    game.draw();
}


start();