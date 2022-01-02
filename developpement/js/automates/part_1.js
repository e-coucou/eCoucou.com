let canvas, canvas2;
let code = 0;
let pas = 3;
let l, c;
let cpt = 0;
let codeP;
let ca;

var s1 = function (sketch) {
    sketch.setup = function () {
        // canvas = sketch.createCanvas(600, 300);
        canvas = sketch.createCanvas(sketch.windowWidth * 0.7, 400);
        canvas.parent('sketch-Atomate_1');
        codeP = sketch.createP('divers');
        codeP.parent('code');
        l = sketch.height / pas;
        c = sketch.width / pas;
        ca = new Automate(code, c, l, pas, sketch.createVector(0, 0), sketch);
        ca.init();
        codeP.html(code);
        sketch.background(51);
    }
    sketch.draw = function () {
        if (cpt < l) {
            ca.update();
            cpt++;
        } else {
            code = (code + 1) % 256;
            ca.code = code;
            ca.initRandom();
            codeP.html(code);
            cpt = 0;
            sketch.background(51);
        }
        ca.show();
    }
};
var s2 = function (sketch) {
    let CAs = [];
    sketch.setup = function () {
        canvas2 = sketch.createCanvas(16 * 60, 16 * 32);
        canvas2.parent('sketch-Atomate_11');
        sketch.background(51);
        for (let i = 0; i < 16; i++) {
            for (let j = 0; j < 16; j++) {
                let ca = new Automate(i + j * 16, 60, 32, 1, sketch.createVector(60 * i, 32 * j), sketch);
                ca.init();
                CAs.push(ca);
            }
        }
    }
    sketch.draw = function () {
        for (let ca of CAs) {
            if (ca.alive) {
                ca.update();
            }
            if (ca.alive || ca.code === code || ca.code === code - 1) {
                ca.show();
            }
        }
    }
};
new p5(s1);
new p5(s2);