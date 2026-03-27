const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 600;
canvas.height= 400;

let x=50;
let y=50;
let radius = 10;

ctx.beginPath();
ctx.arc(x, y, radius, 0, Math.PI * 2);

ctx.fillStyle = "red";
ctx.fill();


function drawBall() {
   

    ctx.biginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.stroke();


   
}

drawBall();


