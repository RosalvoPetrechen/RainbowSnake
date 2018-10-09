let initSpeed = 5; //initial speed (framerate)
let acc = 0.1; //acceleration steps
let speed; //current speed
let invisible = false;

class Snake {
  constructor() {
    this.body = [];
    this.body[0] = createVector(
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
    let head = this.body[this.body.length - 1].copy();
    this.body.shift();
    head.x += this.xdir;
    head.y += this.ydir;
    this.body.push(head);
  }

  grow() {
    let head = this.body[this.body.length - 1].copy();
    this.body.push(head);
  }

  endGame() {
    let x = this.body[this.body.length - 1].x;
    let y = this.body[this.body.length - 1].y;
    if (invisible) {
      if (x > playableAreaWidth) {
        this.body[this.body.length - 1].x = 0;
        x = 0;
      } else if (x < 0) {
        this.body[this.body.length - 1].x = playableAreaWidth;
        x = playableAreaWidth;
      } else if (y > playableAreaHeight) {
        this.body[this.body.length - 1].y = 0;
        y = 0;
      } else if (y < 0) {
        this.body[this.body.length - 1].y = playableAreaHeight;
        y = playableAreaHeight;
      }
      return false;
    }
    if (x > playableAreaWidth || x < 0 || y > playableAreaHeight || y < 0) {
      return true;
    }
    for (let i = 0; i < this.body.length - 1; i++) {
      let part = this.body[i];
      if (part.x == x && part.y == y) {
        return true;
      }
    }
    return false;
  }

  eat(pos) {
    if (snake.body[snake.body.length - 1].equals(pos)) {
      this.grow();
      foodTime1 = millis();
      foodTime2 = foodTime1 - foodTime2;
      score = score + round(speed * ((1 / foodTime2) * 10000) * powerBerry);
      speed += acc;
      if (powerBerry == 2) {
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
      noStroke();
      fill(0, 51, 25);
      if (i == this.body.length - 1) {
        ellipse(this.body[i].x - headX, this.body[i].y - headY, headH, headW);
      } else {
        //stroke(100);
        rect(this.body[i].x, this.body[i].y, resolution, resolution);
      }
    }
  }
}
