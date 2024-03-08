'use strict';
var timerInterval = setInterval(updateTimer, 1000);
// Adding IE support / stopping IE balking on AudioContext()
function getAudioContext() {
    if (typeof AudioContext !== "undefined") {
        return new AudioContext();
    } else if (typeof webkitAudioContext !== "undefined") {
        return new webkitAudioContext();
    } else if (typeof mozAudioContext !== "undefined") {
        return new mozAudioContext();
    } else {
        noAudio = true;
        console.log('Web Audio API is not supported');
    }
}

/* VARIABLES */
var iterator, loop, Tau = Math.PI * 2,
    canvasWidth = 800, canvasHeight = 600,
    context, beginPath, moveTo, lineTo,
    audioContext, attack = 50, decay = 400, frequency, noAudio = false,
    rightDown = false, leftDown = false, upDown = false, downDown = false,
    levelTick = 0,
    wall, walls = [],
    pt2 = { x: 0, y: 0 }, pt3 = { x: 0, y: 0 },
    speed = 3,
    lives = 3, replayLevel = false,
    resetLives = false,
    player = {
        r: 15,
        q: 5,
        h: '#eee'
    },
    heart = {
        r: 10,
        h: '#f11',
        v: 0
    },
    running = false,
    timeDisplay, messageDisplay, titleDisplay, livesDisplay,
    messageCounter, messageString, msg = [], messageTimer,
    messages = ['Para ti <br><br>¡Feliz Día de San Valentín! Quería tomarme un momento para decirte que realmente aprecio tu amistad y la alegría que traes a mi vida. Espero que tu día esté lleno de amor y felicidad, ¡te lo mereces! 😊💕<br><br> Espero que tengamos la oportunidad de seguir compartiendo momentos increíbles juntos.',],
    gameLevel = 0, maxGameLevel,
    wallString = '',
    levelData = [];
levelData.push({ px: 400, py: 350, hx: 400, hy: 150, t: 20, m: 0, id: 'First Kiss' });

maxGameLevel = levelData.length;

function update() {
    heart.t++;
    if (rightDown) { player.x += speed; }
    if (leftDown) { player.x -= speed; }
    if (upDown) { player.y -= speed; }
    if (downDown) { player.y += speed; }
}

function animate() {
    if (running) {
        update();
        requestAnimFrame(animate);
    }
}

function init() {
    levelTick = 0;
    timeDisplay = document.getElementById('t');
    livesDisplay = document.getElementById('l');
    messageDisplay = document.getElementById('m');
    titleDisplay = document.getElementById('n');
    var canvas = document.createElement('canvas', canvasWidth, canvasHeight);
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    document.getElementById('w').appendChild(canvas);
    context = canvas.getContext('2d');
    context.lineCap = "round";
    audioContext = getAudioContext();
    beginPath = function () { return context.beginPath(); }
    moveTo = function (x, y) { return context.moveTo(x, y); }
    lineTo = function (x, y) { return context.lineTo(x, y); }
    setMessage(0);
}

function setMessage(value) {
    messageDisplay.style.display = 'block';
    msg.length = 0;
    messageCounter = 0;
    messageString = '';
    msg = messages[value].split(' ');
    messageDisplay.innerHTML = '';
    displayMessageFragment();
}

function displayMessageFragment() {
    var fragment = msg[messageCounter++];
    if (fragment === undefined) {
        fragment = '';
    }
    messageString += fragment + ' ';
    messageDisplay.innerHTML = messageString;
    if (messageCounter < msg.length) {
        messageTimer = setTimeout(displayMessageFragment, 100);
    }
}

function updateTimer() {
    var countdownElement = document.getElementById('t');
    var timeLeft = parseInt(countdownElement.textContent);
    timeLeft--;
    countdownElement.textContent = timeLeft;
    if (timeLeft === 0) {
        clearInterval(timerInterval);
    }
}

init();
animate();