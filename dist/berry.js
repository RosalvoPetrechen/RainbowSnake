let powerBerry;

class Berry {
  constructor() {
    this.x = round(random(playableAreaWidth) / resolution) * resolution;
    this.y = round(random(playableAreaHeight - 20) / resolution) * resolution;
    this.food = createVector(this.x, this.y);
    this.powerBerry = random();
  }

  show() {
    stroke(120);
    if (this.powerBerry < 0.1) {
      fill(255, 0, 0);
      powerBerry = 2;
    } else {
      fill(0, 255, 0);
      powerBerry = 1;
    }
    ellipseMode(CORNER);
    ellipse(this.food.x, this.food.y, resolution, resolution);
  }
}
