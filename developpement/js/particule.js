class Particule {
  constructor(pos_, d_, c_) {
    this.pos = pos_;
    this.vel = createVector(random(0.2, 0.4), 0);
    this.density = d_;
    this.color = c_;
  }

  update() {
    this.pos.add(this.vel);
  }

  show() {
    stroke(this.color);
    strokeWeight(8);
    strokeWeight(this.density);
    noFill();
    point(this.pos.x, this.pos.y);
  }
}