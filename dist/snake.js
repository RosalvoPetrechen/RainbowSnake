let initSpeed = 5; //initial speed (framerate)
let acc = 0.1; //acceleration steps
let speed; //current speed
let prevSpeed; //before pause
let invisible = false;

class Snake {
  constructor() {
    this.body = [[[], snakePoint]]; // array 0 is position, 1 is direction
    this.body[0][0][0] = createVector(
      round(playableAreaWidth / 2 / resolution) * resolution,
      floor(playableAreaHeight / 2 / resolution) * resolution
    );
    this.xdir = 0;
    this.ydir = 0;
  }

  setDir(x, y, point) {
    let dir = createVector(x, y);
    if (dir.x == -prevDir.x || dir.y == -prevDir.y) {
    } else {
      snakePoint = point;
      this.xdir = dir.x;
      this.ydir = dir.y;
      prevDir = dir.copy();
    }
  }

  update() {
    let head = this.body[this.body.length - 1][0][0].copy();
    this.body.shift(); //remove the first
    head.x += this.xdir;
    head.y += this.ydir;
    this.body.push([[head], snakePoint]); //add to the end
  }

  grow() {
    //add to the beggining of the array
    let head = this.body[0][0][0].copy();
    this.body.unshift([[head], snakePoint]);

    //add to the end of the array
    // let head = this.body[this.body.length - 1][0][0].copy();
    // this.body.push([[head], snakePoint]);
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
    let prevSprite = 0;
    for (let i = 0; i < this.body.length; i++) {
      let selectSprite;
      if (invisible) {
        tint(255, 0, 0);
      } else {
        noTint();
      }
      if (i == this.body.length - 1) {
        //head position
        selectSprite = snakePoint;
      } else if (i == 0) {
        //tail position
        this.body[0][1] = this.body[1][1];
        selectSprite = this.body[0][1] + 4;
      } else {
        //body position
        let actualPart = this.body[i][1]; //direction of the body part
        let prevPart = this.body[i - 1][1]; //direction of the previous part
        let nextPart = this.body[i + 1][1]; //direction of the next part
        if (prevPart == 3 && nextPart == 0) {
          if (prevSprite == 8) {
            selectSprite = 12;
          } else {
            selectSprite = 8;
          }
        } else if (prevPart == 2 && nextPart == 1) {
          if (prevSprite == 8) {
            selectSprite = 13;
          } else {
            selectSprite = 8;
          }
        } else if (prevPart == 3 && nextPart == 2) {
          if (prevSprite == 9) {
            selectSprite = 12;
          } else {
            selectSprite = 9;
          }
        } else if (prevPart == 0 && nextPart == 1) {
          if (prevSprite == 9) {
            selectSprite = 13;
          } else {
            selectSprite = 9;
          }
        } else if (prevPart == 1 && nextPart == 2) {
          if (prevSprite == 10) {
            selectSprite = 12;
          } else {
            selectSprite = 10;
          }
        } else if (prevPart == 0 && nextPart == 3) {
          if (prevSprite == 10) {
            selectSprite = 13;
          } else {
            selectSprite = 10;
          }
        } else if (prevPart == 1 && nextPart == 0) {
          if (prevSprite == 11) {
            selectSprite = 12;
          } else {
            selectSprite = 11;
          }
        } else if (prevPart == 2 && nextPart == 3) {
          if (prevSprite == 11) {
            selectSprite = 13;
          } else {
            selectSprite = 11;
          }
        } else if (actualPart == 0 || actualPart == 2) {
          selectSprite = 12;
        } else {
          selectSprite = 13;
        }
      }
      image(
        animation[selectSprite],
        this.body[i][0][0].x,
        this.body[i][0][0].y,
        resolution,
        resolution
      );
      prevSprite = selectSprite;
    }
  }
}
