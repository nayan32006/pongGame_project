const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 600;
canvas.height= 400;

// ball
let x=50;
let y=50;
let radius = 10;
 if(y + radius > canvas.height || y-radius < 0){
        dy = -dy;
    }

//paddle
let paddleWidth = 10;
let paddleHeight =80;
let paddleY =150;

//mouse control
document.addEventListener("mousemove", function(e) {
    console.log("mouse moving")
    paddleY = e.clientY - paddleHeight /2 ;


// limit paddle inside canvas
if(paddleY < 0) paddleY=0;
if(paddleY > canvas.height - paddleHeight){
    paddleY = canvas.height - paddleHeight;
}

});

//draw function


function draw() {
    ctx.clearRect(0,0 ,canvas.width ,canvas.height);
   
    // ball
    ctx.beginPath();
    ctx.arc(x, y, radius,10, 0, Math.PI * 2);
    ctx.fillStyle = "red";
    ctx.fill();

    //paddle
    ctx.fillRect(10, paddleY, 10, 80);

    //move ball
    x += 2;
    y += 2;

    //wall collision
    if(y + radius > canvas.height || y-radius < 0){
        dy = -dy;
    }

    //paddle collision
    if (x -radius < 20 && y> paddleY && y < paddleY + paddleHeight) {
        dx = -dx;
    }

    // right wall bounce
    if(x + radius > canvas.width) {
        dx = -dx ;
    }

    requestAnimationFrame(draw);
}

    

// start game
draw();


