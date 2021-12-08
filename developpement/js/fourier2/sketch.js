let canvas;

let n = 200;
let path = [];
let fourierY;
let time = 0;

let signal = [];

function setup() {
  canvas = createCanvas(windowWidth*0.67, 400);
  canvas.parent('sketch-fourier');

  for (let i = 0; i < n; i++) {
    signal[i] = i - 100;
    // signal[i] = random(-100, 100);
    // signal[i] = new Complex(i, random(-100, 100));
  }
  fourierY = dft(signal);
}

function epiCycle() {

}

function draw() {
  background(0);
  let xi = 0,
    yi = 0;
  translate(200, height / 2);
  for (let i = 0; i < fourierY.length; i++) {
    let freq = fourierY[i].freq;
    let r = fourierY[i].amp;
    let phase = fourierY[i].phase;
    let x = xi + r * cos(freq * time + phase + HALF_PI);
    let y = yi + r * sin(freq * time + phase + HALF_PI);
    stroke(255, 155), noFill(), strokeWeight(1);
    circle(xi, yi, 2 * r);
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
  const dt = TWO_PI / fourierY.length;
  time += dt;
  // angle %= TWO_PI;
  if (path.length > width - 210 - 200) path.pop();
}