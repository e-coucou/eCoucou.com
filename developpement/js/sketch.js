let canvas;
let particules = [];

function setup() {
  canvas = createCanvas(400, 600);
  canvas.parent('sketch-dev');
  particules.push(new Particule(createVector(width / 2, height / 2), 'I'));
  background(0);
  // frameRate(5);
}

function draw() {
  background(0);
  if (random() > 0.5) {
    particules.push(new Particule(createVector(random(-100, 100) + width / 2, height / 3), 'I'));
  }
  for (let i = particules.length - 1; i >= 0; i--) {

    // if (p.isColonne()) {
    let a = random() * PI;
    // let V = createVector(width / 2, (p.sens + 1) * height / 2);
    let dev = p5.Vector.fromAngle(particules[i].sens * a).setMag(0.1); //random(0.5, 0.7));
    if (frameCount % 3 === 1) {
      particules[i].vel.add(dev);
    }
    if (particules[i].type === 'b' || particules[i].type === 'I') {
      particules[i].vel.setMag(0.7);
    } else if (particules[i].type === 'a') {
      particules[i].vel.setMag(1);
    }
    particules[i].paroies();
    particules[i].update();
    particules[i].show();
    if (particules[i].edges()) {
      particules.splice(i, 1);
    } else {
      if (particules[i].type === 'I' && random() > 0.995) {
        particules.push(new Particule(particules[i].pos, 'a'));
        particules.push(new Particule(particules[i].pos, 'a'));
        particules.push(new Particule(particules[i].pos, 'b'));
        particules.splice(i, 1);
      }
    }
  }
}