class Particule {
  constructor(pos_, d_, c_) {
    this.pos = pos_;
    this.vel = createVector(random(0.4, 0.6), 0);
    this.acc = createVector(0, 0);
    this.density = d_;
    this.color = c_;
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(0.5);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  applyForce(force) {
    this.acc = force;
  }

  isColonne() {
    return (this.pos.x < 350 && this.pos.x > 50);
  }

  show() {
    stroke(this.color);
    strokeWeight(8);
    strokeWeight(this.density);
    noFill();
    point(this.pos.x, this.pos.y);
  }
}