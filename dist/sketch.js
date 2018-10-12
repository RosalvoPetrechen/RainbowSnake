//Objects
let snake;
let bunny;

//Canvas variables
let canvas;
let canvasWidth = 400;
let canvasHeight = 400;
let playableAreaWidth;
let playableAreaHeight;
let resolution = 20;

//Snake direction
let snakePoint;
let prevDir;

let spritesheet;
let spritedata;
let animation = [];

let foodTime1 = 0; //time between foods for score purposes
let foodTime2 = 0; //time between foods for score purposes
let comboTrigger = false;
let comboValue;
let comboLocation;
let comboFade = initSpeed;
let boost;
let paused;
let slow;
let gameover;
let level = "Normal";

dbconfig();

function preload() {
  spritesheet = loadImage("snakesprite/snake.png");
  spritedata = loadJSON("snakesprite/snake.json");
}

function setup() {
  let frames = spritedata.snakeFrames;
  for (let i = 0; i < frames.length; i++) {
    let pos = frames[i].position;
    let img = spritesheet.get(pos.x, pos.y, pos.w, pos.h);
    animation.push(img);
  }
  imageMode(CORNER);
  gameover = false;
  snakePoint = 0;
  prevDir = createVector(1, 1);
  canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent("canvas-holder");
  speed = initSpeed;
  boost = false;
  paused = false;
  slow = false;
  score = 0;
  playableAreaWidth = canvasWidth - resolution;
  playableAreaHeight = canvasHeight - resolution;
  snake = new Snake();
  bunny = new Bunny();
}

function levelEasy() {
  initSpeed = 2;
  acc = 0.05;
  level = "Easy";
  newGame();
}

function levelNormal() {
  initSpeed = 5;
  acc = 0.1;
  level = "Normal";
  newGame();
}

function levelHard() {
  initSpeed = 10;
  acc = 0.5;
  level = "Hard";
  newGame();
}

function newGame() {
  canvasWidth = document.getElementById("newwidth").value;
  canvasHeight = document.getElementById("newheight").value;
  gotData();
  setup();
}

function keyPressed() {
  switch (keyCode) {
    case UP_ARROW:
      snake.setDir(0, -resolution, 0);
      break;
    case RIGHT_ARROW:
      snake.setDir(resolution, 0, 1);
      break;
    case DOWN_ARROW:
      snake.setDir(0, resolution, 2);
      break;
    case LEFT_ARROW:
      snake.setDir(-resolution, 0, 3);
      break;
    case SHIFT: //toogle booster, increasing speed by xx%
      booster();
      break;
    case ENTER:
      pauseMe();
      break;
    case CONTROL:
      superSlow();
      break;
    default:
  }
}

function booster() {
  if (boost) {
    speed = speed / 1.5;
    boost = false;
  } else {
    speed = speed * 1.5;
    boost = true;
  }
}

// NOT WORKING, PAUSE FOREVER
function pauseMe() {
  if (paused) {
    speed = prevSpeed;
    paused = false;
  } else {
    prevSpeed = speed;
    speed = 0;
    paused = true;
  }
}

function superSlow() {
  if (slow) {
    speed = prevSpeed;
    slow = false;
  } else {
    prevSpeed = speed;
    speed = 0.05;
    slow = true;
  }
}

function prepareCombo() {
  comboValue = round((1 / foodTime2) * 10000);
  comboLocation = bunny.food;
  comboFade = speed;
  comboTrigger = true;
  foodTime2 = foodTime1;
}

function showCombo() {
  if (comboFade <= 0) {
    comboTrigger = false;
    comboFade = speed;
  } else {
    textSize(comboFade * 10);
    fill(255, 0, 255);
    textAlign(LEFT, CENTER);
    text("X" + comboValue, comboLocation.x, comboLocation.y);
    comboFade--;
  }
}

function checkCollision() {
  //check if food appear on the snake body
  for (let i = 0; i < snake.body.length - 1; i++) {
    let bodyPart = snake.body[i][0][0];
    //if do, create a new food and check again
    if (bunny.food.equals(bodyPart)) {
      bunny = new Bunny();
      i = 0;
    }
  }
}

function writeStatus() {
  document.getElementById(
    "navbarscore"
  ).innerHTML = `Score: ${score} <small class="rainbow-style">Level: ${level} Speed: ${speed.toFixed(
    1
  )} Highscore: ${highScore} ${frameCount}</small>`;
}

function draw() {
  if (gameover) {
  } else {
    frameRate(speed);
    if (score > highScore) {
      highScore = score;
    }
    background(220);
    writeStatus();
    if (snake.eat(bunny.food)) {
      prepareCombo();
      bunny = new Bunny();
      checkCollision();
    }
    snake.update();
    snake.show();

    if (comboTrigger) {
      showCombo();
    }
    if (snake.endGame()) {
      gameover = true;
      retrieveScore();
    } else {
      bunny.show();
    }
  }
}
