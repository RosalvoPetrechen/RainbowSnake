let initSpeed = 5; //initial speed (framerate)
let acc = 0.1; //acceleration steps
let speed; //current speed
let prevSpeed; //before pause
let invisible = false;

class Snake {
  constructor() {
    this.body = [[[], 666]]; // array 0 is position, 1 is direction
    this.body[0][0][0] = createVector(
      round(playableAreaWidth / 2 / resolution) * resolution,
      floor(playableAreaHeight / 2 / resolution) * resolution
    );
    this.xdir = 0;
    this.ydir = 0;
  }

  setDir(x, y) {
    this.xdir = x;
    this.ydir = y;
  }

  update() {
    let headPosition = this.body[this.body.length - 1][0][0].copy();
    let headDir = this.body[this.body.length - 1][1];
    this.body.shift(); //remove the first
    headPosition.x += this.xdir;
    headPosition.y += this.ydir;
    headDir += 1;
    this.body.push([[headPosition], headDir]); //add to the end
  }

  grow() {
    let head = this.body[this.body.length - 1][0][0].copy();
    this.body.push([[head], 777]);
  }

  endGame() {
    let x = this.body[this.body.length - 1][0][0].x;
    let y = this.body[this.body.length - 1][0][0].y;
    if (invisible) {
      if (x > playableAreaWidth) {
        this.body[this.body.length - 1][0][0].x = 0;
        x = 0;
      } else if (x < 0) {
        this.body[this.body.length - 1][0][0].x = playableAreaWidth;
        x = playableAreaWidth;
      } else if (y > playableAreaHeight) {
        this.body[this.body.length - 1][0][0].y = 0;
        y = 0;
      } else if (y < 0) {
        this.body[this.body.length - 1][0][0].y = playableAreaHeight;
        y = playableAreaHeight;
      }
      return false;
    }
    if (x > playableAreaWidth || x < 0 || y > playableAreaHeight || y < 0) {
      return true;
    }
    for (let i = 0; i < this.body.length - 1; i++) {
      let part = this.body[i][0][0];
      if (part.x == x && part.y == y) {
        return true;
      }
    }
    return false;
  }

  eat(pos) {
    if (this.body[this.body.length - 1][0][0].equals(pos)) {
      this.grow();
      foodTime1 = millis();
      foodTime2 = foodTime1 - foodTime2;
      score = score + round(speed * ((1 / foodTime2) * 10000) * powerBunny);
      speed += acc;
      if (powerBunny == 2) {
        invisible = true;
      } else {
        invisible = false;
      }
      return true;
    }
    return false;
  }

  show() {
    for (let i = 0; i < this.body.length; i++) {
      if (invisible) {
        tint(255, 0, 0);
      } else {
        noTint();
      }
      noStroke();
      fill(0, 51, 25);
      if (i == this.body.length - 1) {
        //head position
        imageMode(CORNER);
        image(
          animation[snakeDir],
          this.body[i][0][0].x,
          this.body[i][0][0].y,
          resolution,
          resolution
        );
      } else if (i == 0) {
        //tail position
        imageMode(CORNER);
        image(
          animation[snakeDir + 4],
          this.body[i][0][0].x,
          this.body[i][0][0].y,
          resolution,
          resolution
        );
      } else {
        //body position
        rect(
          this.body[i][0][0].x,
          this.body[i][0][0].y,
          resolution,
          resolution
        );
      }
    }
  }
}
