class Complex {
  constructor(re, im) {
    this.re = re;
    this.im = im;
  }

  mul(c) {
    const re = this.re * c.re - this.im * c.im;
    const im = this.re * c.im + this.im * c.re;

    return new Complex(re, im);
  }

  add(c) {
    this.re += c.re;
    this.im += c.im;
  }

  amplitude() {
    return sqrt(this.re * this.re + this.im * this.im);
  }

  phase() {
    return atan2(this.im, this.re);
  }
}


//----------
// Discret Fourier Transform
function dft_C(x) {
  let X = [];
  const N = x.length;
  for (let k = 0; k < N; k++) {
    let sum = new Complex(0, 0);
    for (let a = 0; a < N; a++) {
      const Phi = (TWO_PI * k * a) / N;
      const c = new Complex(cos(Phi), -sin(Phi));
      sum.add(x[a].mul(c));
    }
    sum.re = sum.re / N;
    sum.im = sum.im / N;

    let amp = sum.amplitude();
    let phase = sum.phase();
    let freq = k;
    X[k] = {
      re: sum.re,
      im: sum.im,
      freq,
      amp,
      phase
    };
  }
  return X;
}
// Discret Fourier Transform
function dft(x) {
  let X = [];
  const N = x.length;
  for (let k = 0; k < N; k++) {
    let re = 0,
      im = 0;
    for (let a = 0; a < N; a++) {
      const w = (TWO_PI * k * a) / N;
      re += x[a] * cos(w);
      im -= x[a] * sin(w)
    }
    re /= N;
    im /= N;

    let amp = sqrt(re * re + im * im);
    let phase = atan2(im, re);
    let freq = k;
    X[k] = {
      re,
      im,
      freq,
      amp,
      phase
    };
  }
  return X;
}