let canvas;

let n = 8;
let angle = 0;
let r = 60;
let path = [];

let w;

function setup() {
  w = windowWidth * 0.8;
  canvas = createCanvas(w, 300);
  canvas.parent('sketch-fourier');

}

function draw() {
  background(0);
  n = round(frameCount / 100);
  let xi = 0,
    yi = 0;
  translate(150, height / 2);
  for (let i = 0; i < n; i++) {
    let t = 2 * i + 1;
    ri = r * (4 / t / PI);
    let x = xi + ri * cos(angle * t);
    let y = yi + ri * sin(angle * t);
    stroke(255, 155), noFill(), strokeWeight(1);
    circle(xi, yi, 2 * ri);
    line(x, y, xi, yi);
    xi = x;
    yi = y;
  }
  stroke(200, 0, 200, 200);
  noFill(), strokeWeight(1);
  line(xi, yi, 200, yi);
  path.unshift(yi);
  strokeWeight(2)
  beginShape();
  for (let i = 0; i < path.length; i++) {
    vertex(i + 200, path[i]);
  }
  endShape();
  angle += 0.03;
  // angle %= TWO_PI;
  if (path.length > width - 210 - 200) path.pop();
}