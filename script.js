const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// गेम वेरिएबल्स
let x, y, dx, dy;
let playerScore = 0;
let aiScore = 0;
let gameRunning = false;
let isPaused = false;

const radius = 8;
const paddleHeight = 90;
const paddleWidth = 12;

let paddleY = 205;
let targetY = 205;
let aiY = 205;
const aiSpeedModifier = 0.09; // AI की स्पीड लिमिट

let particles = [];

// ऑडियो इंजन (बिना किसी बाहरी फाइल के)
function triggerSynthAudio(frequency, signatureType, outputDuration) {
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const soundOscillator = audioCtx.createOscillator();
    const systemGainControl = audioCtx.createGain();
    
    soundOscillator.type = signatureType;
    soundOscillator.frequency.value = frequency;
    systemGainControl.gain.setValueAtTime(0.12, audioCtx.currentTime);
    systemGainControl.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + outputDuration);
    
    soundOscillator.connect(systemGainControl);
    systemGainControl.connect(audioCtx.destination);
    soundOscillator.start();
    soundOscillator.stop(audioCtx.currentTime + outputDuration);
  } catch(err) {}
}

// माउस ट्रैकिंग
canvas.addEventListener("mousemove", (e) => {
  const rect = canvas.getBoundingClientRect();
  targetY = e.clientY - rect.top - paddleHeight / 2;
});

// 'P' की से पॉज
document.addEventListener("keydown", (e) => {
  if (e.key.toLowerCase() === "p" && gameRunning) isPaused = !isPaused;
});

// चिंगारी इफेक्ट (Particles)
function spawnVisualJuiceParticles(originX, originY, density) {
  for (let i = 0; i < density; i++) {
    particles.push({
      x: originX, y: originY,
      vx: (Math.random() - 0.5) * 7,
      vy: (Math.random() - 0.5) * 7,
      opacityValue: 1,
      dimension: Math.random() * 3 + 2
    });
  }
}

function resetBallSystem(serveVector) {
  x = canvas.width / 2; 
  y = canvas.height / 2;
  dx = serveVector * 5; 
  dy = (Math.random() > 0.5 ? 2 : -2) * 3;
}

function restartGame() {
  playerScore = 0; 
  aiScore = 0; 
  gameRunning = true; 
  isPaused = false;
  resetBallSystem(1);
}

function runtimeCalculations() {
  paddleY += (targetY - paddleY) * 0.25;
  paddleY = Math.max(0, Math.min(canvas.height - paddleHeight, paddleY));

  aiY += ((y - paddleHeight / 2) - aiY) * aiSpeedModifier;
  aiY = Math.max(0, Math.min(canvas.height - paddleHeight, aiY));

  x += dx; 
  y += dy;

  if (y - radius < 0) { y = radius; dy = -dy; triggerSynthAudio(330, "square", 0.07); }
  if (y + radius > canvas.height) { y = canvas.height - radius; dy = -dy; triggerSynthAudio(330, "square", 0.07); }

  // प्लेयर पैडल टकराव
  if (dx < 0 && x - radius <= 25 && x - radius >= 10 && y > paddleY && y < paddleY + paddleHeight) {
    let intersectionPoint = (paddleY + (paddleHeight / 2)) - y;
    dx = -dx * 1.06; 
    dy = -(intersectionPoint / (paddleHeight / 2)) * 6;
    x = 25 + radius; 
    spawnVisualJuiceParticles(x, y, 10); 
    triggerSynthAudio(520, "square", 0.09); 
  }

  // AI पैडल टकराव
  if (dx > 0 && x + radius >= canvas.width - 25 && x + radius <= canvas.width - 10 && y > aiY && y < aiY + paddleHeight) {
    let intersectionPoint = (aiY + (paddleHeight / 2)) - y;
    dx = -dx * 1.06; 
    dy = -(intersectionPoint / (paddleHeight / 2)) * 6;
    x = canvas.width - 25 - radius;
    spawnVisualJuiceParticles(x, y, 10);
    triggerSynthAudio(490, "square", 0.09);
  }

  if (x - radius < 0) { aiScore++; triggerSynthAudio(180, "sawtooth", 0.25); evaluateMatchState(-1); }
  else if (x + radius > canvas.width) { playerScore++; triggerSynthAudio(700, "sine", 0.2); evaluateMatchState(1); }

  for (let i = particles.length - 1; i >= 0; i--) {
    let p = particles[i]; p.x += p.vx; p.y += p.vy; p.opacityValue -= 0.025;
    if (p.opacityValue <= 0) particles.splice(i, 1);
  }
}

function evaluateMatchState(nextVector) {
  if (playerScore >= 5 || aiScore >= 5) gameRunning = false;
  else resetBallSystem(nextVector);
}

function drawEngineAssets() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // सेंटर लाइन
  ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
  ctx.setLineDash([12, 12]); ctx.beginPath();
  ctx.moveTo(canvas.width / 2, 0); ctx.lineTo(canvas.width / 2, canvas.height);
  ctx.stroke(); ctx.setLineDash([]);

  // बैकग्राउंड स्कोर
  ctx.font = "bold 80px 'Courier New'"; ctx.fillStyle = "rgba(255, 255, 255, 0.06)";
  ctx.textAlign = "center";
  ctx.fillText(playerScore, canvas.width / 4, canvas.height / 2 + 30);
  ctx.fillText(aiScore, (canvas.width / 4) * 3, canvas.height / 2 + 30);

  // ऑब्जेक्ट्स ड्रा करना
  ctx.fillStyle = "#fff";
  ctx.fillRect(15, paddleY, paddleWidth, paddleHeight);
  ctx.fillRect(canvas.width - 15 - paddleWidth, aiY, paddleWidth, paddleHeight);

  if (gameRunning) {
    ctx.beginPath(); ctx.arc(x, y, radius, 0, Math.PI * 2); ctx.fill();
  }

  particles.forEach(p => {
    ctx.fillStyle = `rgba(255, 255, 255, ${p.opacityValue})`;
    ctx.fillRect(p.x, p.y, p.dimension, p.dimension);
  });

  ctx.font = "24px 'Courier New'"; ctx.fillStyle = "#fff";
  if (isPaused) ctx.fillText("SYSTEM PAUSED", canvas.width / 2, canvas.height / 2);
  
  if (!gameRunning && (playerScore >= 5 || aiScore >= 5)) {
    ctx.fillStyle = "rgba(0,0,0,0.85)"; ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = "#fff"; ctx.font = "36px 'Courier New'";
    ctx.fillText(playerScore >= 5 ? "VICTORY ACHIEVED" : "AI DOMINANCE", canvas.width / 2, canvas.height / 2 - 20);
    ctx.font = "18px 'Courier New'";
    ctx.fillText("Click 'RESET SYSTEM MATCH' to play again.", canvas.width / 2, canvas.height / 2 + 30);
  }
}

function absoluteMainLoop() {
  if (gameRunning && !isPaused) runtimeCalculations();
  drawEngineAssets();
  requestAnimationFrame(absoluteMainLoop);
}

// ऑटो-स्टार्ट
restartGame();
requestAnimationFrame(absoluteMainLoop);
