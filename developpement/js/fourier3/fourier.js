class Complex {
  constructor(re, im) {
    this.re = re;
    this.im = im;
  }

  // static mul(c,o) {
  //   const re = o.re * c.re - o.im * c.im;
  //   const im = o.re * c.im + o.im * c.re;

  //   return new Complex(re, im);
  // }

  mul(c,ret) {
    const re = this.re * c.re - this.im * c.im;
    const im = this.re * c.im + this.im * c.re;

    ret.re = re;
    ret.im = im;

    return ret;

  }

  add(c, ret) {
    ret.re = this.re + c.re;
    ret.im = this.im + c.im;
    return ret;
  }

  // add(c,ret) {
  //   console.log('coucou 2');
  //   this.re += c.re;
  //   this.im += c.im;

  // }

  sub(c, ret) {
    ret.re = this.re - c.re;
    ret.im = this.im - c.im;
    return ret;
  }

  mult(a) {
    this.re *= a;
    this.im *= a;
  }

  // sub(c) {
  //   this.re -= c.re;
  //   this.im -= c.im;
  // }

  expW(ret) {
    let er = Math.exp(this.re);
    ret.re = er * Math.cos(this.im);
    ret.im = er * Math.sin(this.im);
    return ret;
  }

  amplitude() {
    return sqrt(this.re * this.re + this.im * this.im);
  }

  phase() {
    return atan2(this.im, this.re);
  }
}
//-------------
// Fast Fourier Transform ...
// v Reel
function fft(X) {
  const x = [...X];
  const N = x.length;
  if (N <= 1) {
    return x;
  }

  // var X = x.slice();
  const hN = N / 2;
  let even = [];
  let odd = [];
  even.length = hN;
  odd.length = hN;
  // on separe even/odd
  for (let i = 0; i < hN; ++i) {
    even[i] = x[i * 2];
    odd[i] = x[i * 2 + 1];
  }
  // on lance la recursivite
  even = fft(even);
  odd = fft(odd);
  // au retour on calcul ...
  const w = -2 * Math.PI;
  for (var k = 0; k < hN; ++k) {
    if (!(even[k] instanceof Complex))
      even[k] = new Complex(even[k], 0);
    if (!(odd[k] instanceof Complex))
      odd[k] = new Complex(odd[k], 0);
    let p = k/N;
    let Wk = new Complex(0,w*p);
    Wk.expW(Wk).mul(odd[k],Wk);
    x[k] = even[k].add(Wk, odd[k]);
    x[k + hN] = even[k].sub(Wk, even[k]);
  }
  return x;
}
//----------
// inverse FFT
function inv_fft(x)
{
  const N = x.length;
  const iN = 1 / N;
 
  //conjugate if imaginary part is not 0

  for(let i = 0 ; i < N; ++i)
    if(x[i] instanceof Complex)
      x[i].im = -x[i].im;
 
  //apply fourier transform
  x = fft(x);
console.log(x[1]); 
  for(let i = 0 ; i < N; ++i)
  {
    //conjugate again
    x[i].im = -x[i].im;
    //scale
    x[i].re *= iN;
    x[i].im *= iN;
  }
  return x;
}
//----------
// fft test
function fft_ep(a) {
    let A = [];
    const N = a.length; 
    A.length = N;
    bit_reverse_copy(a, A);
    for (let s = 1 ; s< Math.log2(N); s++ ) {
        let m = 2 * s;
        let wm = Math.exp(-2*Math.PI/m);
        for (let k = 0; k< N; k +=m) {
            let w = 1;
            for (let j = 0; j < m/2; j++) {
                let t = w * A[k + j + m/2];
                let u = A[k + j];
                A[k + j] = u + t;
                A[k + j + m/2] = u - t;
                w = w * wm;
            }
        }
    }   
    return A
}

function bit_reverse_copy(a,A) {

    const N = a.length;
    for (let k = 0; k< N; k++) {
        A[rev(k,N)] = a[k];
    }
}

function rev(k,N) {
  const n = Math.log2(N);
  let v = 0;
  for (let i = 0; i<n; i++) {
    v += ((k>>i) & 1) << (n-i-1);
  }
  return v;
}


//----------
// Discret Fourier Transform Complex
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