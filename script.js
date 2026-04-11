const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 600;
canvas.height= 400;

let dx = 3;
let dy = 3;

let score = 0;

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
let paddleY =250;

//mouse control
document.addEventListener("mousemove", function(e) {
    console.log("mouse moving")
    paddleY = e.clientY - paddleHeight /2 ;


// limit paddle inside canvas
if(paddleY < 0) paddleY=0;
if(paddleY > canvas.height - paddleHeight){
    paddleY = canvas.height - paddleHeight;

if(dx>10) dx=10;
if(dy>10) dy=10;
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

    // score count
    ctx.font = "20px Arial";
    ctx.fillStyle = "black";
    ctx.fillText("score:" + score, 250, 30);


    //move ball
    x += dx;
    y += dy;

    //wall collision
    if(y + radius > canvas.height || y-radius < 0){
        dy = -dy;
    }

    //paddle collision
    if (x -radius < 20 && y> paddleY && y < paddleY + paddleHeight) {
        // dx = Math.abs(dx);
        dx = -dx * 1.1;
        dy = dy * 1.05;
        score++;
    }

    // right wall bounce
    if(x + radius > canvas.width) {
        dx = -dx ;
    }

    // ball paddle miss
    if(x<0) {
        alert("Game Over! Score: " + score);
        document.location.reload();
    }


    requestAnimationFrame(draw);
}

    

// start game
draw();
