let snake;
let rez = 20; //change the size of the grid
let canvasPosition;
let canvasWidth = 400;
let canvasHeight = 400;
let headH = rez;
let headW = rez;
let headX = 0;
let headY = 0;
let berry;
let powerBerry;
let invisible = false;
let w;
let h;
let initSpeed = 5; //initial speed (framerate)
let acc = 0.1; //acceleration steps
let speed; //current speed
let highScore = 0;
let score = 0; //current score
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
  canvasPosition = createCanvas(canvasWidth, canvasHeight);
  centerCanvas();
  speed = initSpeed;
  boost = false;
  score = 0;
  w = width - rez;
  h = height - rez;
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
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  canvasPosition.position(x, y);
}

function windowResized() {
  centerCanvas();
}

function keyPressed() {
  switch (keyCode) {
    case LEFT_ARROW:
      snake.setDir(-rez, 0);
      headH = rez * 1.5;
      headW = rez;
      headX = 0;
      headY = 0;
      break;
    case RIGHT_ARROW:
      snake.setDir(rez, 0);
      headH = rez * 1.5;
      headW = rez;
      headX = rez / 2;
      headY = 0;
      break;
    case DOWN_ARROW:
      snake.setDir(0, rez);
      headH = rez;
      headW = rez * 1.5;
      headX = 0;
      headY = rez / 2;
      break;
    case UP_ARROW:
      snake.setDir(0, -rez);
      headH = rez;
      headW = rez * 1.5;
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
    document.getElementById("navbarscore").innerHTML =
      "<font size='5' color='#C70039'><strong>Score: " +
      score +
      "</strong></font>  Level: " +
      level +
      " Speed: " +
      speed.toFixed(1) +
      "  Eated: " +
      (snake.body.length - 1) +
      " Highscore: " +
      highScore;
    if (snake.eat(berry.food)) {
      comboValue = round((1 / foodTime2) * 10000);
      comboLocation = berry.food;
      comboFade = speed;
      comboTrigger = true;
      foodTime2 = foodTime1;
      berry = new Berry();
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
    snake.update();
    snake.show();

    if (comboTrigger) {
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
    if (snake.endGame()) {
      gameover = true;
      retrieveScore();
    } else {
      berry.show();
    }
  }
}
