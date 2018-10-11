let powerBunny;

class Bunny {
  constructor() {
    this.x = round(random(playableAreaWidth) / resolution) * resolution;
    this.y = round(random(playableAreaHeight - 20) / resolution) * resolution;
    this.food = createVector(this.x, this.y);
    this.powerBunny = random();
  }

  show() {
    stroke(120);
    if (this.powerBunny < 0.5) {
      // fill(255, 0, 0);
      powerBunny = 2;
      tint(255, 0, 0);
    } else {
      // fill(0, 255, 0);
      powerBunny = 1;
      noTint();
    }
    ellipseMode(CORNER);
    // ellipse(this.food.x, this.food.y, resolution, resolution);
    imageMode(CORNER);
    image(animation[14], this.food.x, this.food.y, resolution, resolution);
    // image(animation[14], this.food.x, this.food.y, resolution, resolution);
  }
}
