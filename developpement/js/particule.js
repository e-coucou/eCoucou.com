class Particule {
  constructor(pos_, t_) {
    this.pos = pos_.copy();
    this.acc = createVector(0, 0);
    this.up = false;
    this.enter = false;
    this.type = t_;
    switch (this.type) {
      case 'I':
        this.sens = 1;
        this.density = 12;
        this.color = color(0, 255, 0, 155);
        this.vel = createVector(0, -this.sens * 4); //random(0.4, 0.6), 0);
        break;
      case 'a': // legers
        this.sens = -1;
        this.density = 5;
        this.color = color(0, 0, 255, 155);
        this.vel = createVector(0, -this.sens * 3); //random(0.4, 0.6), 0);
        break;
      case 'b': // lourds
        this.sens = 1;
        this.density = 8;
        this.color = color(255, 0, 0, 155);
        this.vel = createVector(0, -this.sens * 2); //random(0.4, 0.6), 0);
        break;
    }
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  applyForce(force) {
    this.acc.add(force);
  }

  seek(cible) {
    let desired = p5.Vector.sub(cible, this.pos).limit(1);
    let steer = p5.Vector.sub(desired, this.vel);
    return steer;
  }

  isColonne() {
    let inC = (this.pos.x < 250 && this.pos.x > 150 && this.pos.y > 100 && this.pos.y < 500);
    if (this.up) {
      if (!inC) {
        return false;
      }
    } else if (this.enter) {
      if (this.pos.x > 230) {
        this.up = true;
      } else if (random() > 0.9) {
        this.up = true;
      }
    } else if (inC) {
      this.enter = true;
    }
    return this.up;
  }

  edges() {
    return (this.pos.y <= 50 || this.pos.y >= height - 50);
  }

  paroies() {
    if (this.pos.x < 100 || this.pos.x > 300) {
      this.vel.x *= -2;
    }
  }

  show() {
    stroke(this.color);
    strokeWeight(this.density);
    noFill();
    point(this.pos.x, this.pos.y);
  }
}