let canvas;

let n = 1024;
let path = [];
let fourierY, fourierFFT;
let time = 0;

let signal = [], signalC = [];

function setup() {
  canvas = createCanvas(windowWidth*0.67, 400);
  canvas.parent('sketch-fourier');

  for (let i = 0; i < n; i++) {
    signal[i] = cos(i / 128 * TWO_PI) * 150;
    signalC[i] = new Complex(signal[i],0);
    // signal[i] = random(-100, 100);
    // signal[i] = new Complex(i, random(-100, 100));
  }
  fourierY = dft(signal);
  fourierFFT = fft(signalC);

  for (let k=0;k<fourierFFT.length;k++) {
    let amp = fourierFFT[k].amplitude() / n;
    let phase = fourierFFT[k].phase();
    let freq = k;
    fourierFFT[k] = {
      re: fourierFFT[k].re/n,
      im: fourierFFT[k].im/n,
      freq,
      amp,
      phase
    };
   }

  // console.log(fourierY);
  // console.log(fourierFFT);
}

function epiCycle(xi,yi,rotation,fourier) {
  for (let i = 0; i < fourier.length; i++) {
    let freq = fourier[i].freq;
    let r = fourier[i].amp;
    let phase = fourier[i].phase;
    let x = xi + r * cos(freq * time + phase + rotation);
    let y = yi + r * sin(freq * time + phase + rotation);
    stroke(255, 155), noFill(), strokeWeight(1);
    circle(xi, yi, 2 * r);
    line(x, y, xi, yi);
    xi = x;
    yi = y;
  }
  stroke(200, 0, 200, 200);
  noFill(), strokeWeight(1);
  line(xi, yi, 200, yi);
  return yi;
}

function draw() {
  background(0);
  let xi = 0,
    yi = 0;
  translate(200, height / 2);

  let v = epiCycle(0,0,HALF_PI,fourierFFT);

  path.unshift(v);
  strokeWeight(2)
  beginShape();
  for (let i = 0; i < path.length; i++) {
    vertex(i + 200, path[i]);
  }
  endShape();
  const dt = TWO_PI / fourierFFT.length;
  time += dt;
  // angle %= TWO_PI;
  if (path.length > width - 210 - 200) path.pop();
}