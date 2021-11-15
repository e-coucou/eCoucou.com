let canvas;
let particules = [];

function setup() {
  canvas = createCanvas(400, 600);
  canvas.parent('sketch-dev');

}

function draw() {
  background(0);
  if (random() > 0.95) {
    particules.push(new Particule(createVector(0, height / 2), 8, color(0, 0, 255, 255)));
  }

  for (p of particules) {
    p.update();
    p.show();
  }
}