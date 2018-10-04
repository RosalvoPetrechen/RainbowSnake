class Snake {
  constructor() {
    this.body = [];
    this.body[0] = createVector(
      round(w / 2 / rez) * rez,
      floor(h / 2 / rez) * rez
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
    if (x > w || x < 0 || y > h || y < 0) {
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
    if (snake.body[snake.body.length - 1].equals(berry.food)) {
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
        rect(this.body[i].x, this.body[i].y, rez, rez);
      }
    }
  }
}
