//Objects
let snake;
let berry;

//Canvas variables
let canvas;
let canvasWidth = 400;
let canvasHeight = 400;
let playableAreaWidth;
let playableAreaHeight;
let resolution = 20;

//Snake head size and position
let headH = resolution;
let headW = resolution;
let headX = 0;
let headY = 0;

// let highScore = 0; //high score
// let score = 0; //current score

let foodTime1 = 0; //time between foods for score purposes
let foodTime2 = 0; //time between foods for score purposes
let comboTrigger = false;
let comboValue;
let comboLocation;
let comboFade = initSpeed;
let boost;
let gameover;
let level = "Normal";

dbconfig();

function setup() {
  gameover = false;
  canvas = createCanvas(canvasWidth, canvasHeight);
  centerCanvas();
  speed = initSpeed;
  boost = false;
  score = 0;
  playableAreaWidth = canvasWidth - resolution;
  playableAreaHeight = canvasHeight - resolution;
  snake = new Snake();
  berry = new Berry();
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

function centerCanvas() {
  var x = (windowWidth - canvasWidth) / 2;
  var y = 150;
  // var y = (windowHeight - canvasHeight) / 1.3;
  canvas.position(x, y);
}

function windowResized() {
  centerCanvas();
}

function keyPressed() {
  switch (keyCode) {
    case LEFT_ARROW:
      snake.setDir(-resolution, 0);
      headH = resolution * 1.5;
      headW = resolution;
      headX = 0;
      headY = 0;
      break;
    case RIGHT_ARROW:
      snake.setDir(resolution, 0);
      headH = resolution * 1.5;
      headW = resolution;
      headX = resolution / 2;
      headY = 0;
      break;
    case DOWN_ARROW:
      snake.setDir(0, resolution);
      headH = resolution;
      headW = resolution * 1.5;
      headX = 0;
      headY = resolution / 2;
      break;
    case UP_ARROW:
      snake.setDir(0, -resolution);
      headH = resolution;
      headW = resolution * 1.5;
      headX = 0;
      headY = 0;
      break;
    case SHIFT: //toogle booster, increasing speed by xx%
      booster();
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

function prepareCombo() {
  comboValue = round((1 / foodTime2) * 10000);
  comboLocation = berry.food;
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
    let bodyPart = snake.body[i];
    //if do, create a new food and check again
    if (berry.food.equals(bodyPart)) {
      berry = new Berry();
      i = 0;
    }
  }
}

function writeStatus() {
  document.getElementById(
    "navbarscore"
  ).innerHTML = `Score: ${score} <small class="text-success">Level: ${level} Speed: ${speed.toFixed(
    1
  )} Highscore: ${highScore}</small>`;
}

function draw() {
  if (gameover) {
  } else {
    frameRate(speed);
    if (score > highScore) {
      highScore = score;
    }
    if (invisible) {
      background(93, 173, 226, 100);
    } else {
      background(220, 230);
    }
    writeStatus();
    if (snake.eat(berry.food)) {
      prepareCombo();
      berry = new Berry();
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
      berry.show();
    }
  }
}
