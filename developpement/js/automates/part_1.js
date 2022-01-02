let canvas, canvas2;
let code = 0;
// let grille = [];
// let rows = [];
let pas = 3;
let l, c;
let cpt = 0;
let codeP;
let ca;

var s1 = function (sketch) {
    sketch.setup = function () {
        // canvas = sketch.createCanvas(600, 300);
        canvas = sketch.createCanvas(sketch.windowWidth, 400);
        canvas.parent('sketch-Atomate_1');
        codeP = sketch.createP('divers');
        codeP.parent('code');
        l = sketch.height / pas;
        c = sketch.width / pas;
        ca = new Automate(code, c, l, pas, sketch.createVector(0, 0), sketch);
        ca.init();
        codeP.html(code);
        sketch.background(51);
        // grille = initGrid();
        // rows.push(grille);
    }
    sketch.draw = function () {
        if (cpt < l) {
            ca.update();
            // grille = nextGen(grille);
            // rows.push(grille);
            cpt++;
        } else {
            // rows = [];
            code = (code + 1) % 256;
            ca.code = code;
            ca.initRandom();
            codeP.html(code);
            // grille = [];
            // grille = initGrid();
            cpt = 0;
            sketch.background(51);
        }
        ca.show();
        // for (let j = 0; j < rows.length; j++) {
        //     for (let i = 0; i < c; i++) {
        //         const x = i * pas;
        //         const y = j * pas;
        //         sketch.fill(255 * rows[j][i]);
        //         sketch.square(x, y, pas);
        //     }
        // }
    }
};
var s2 = function (sketch) {
    let CAs = [];
    sketch.setup = function () {
        canvas2 = sketch.createCanvas(600, 26 * 32);
        canvas2.parent('sketch-Atomate_11');
        sketch.background(51);
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 26; j++) {
                let ca = new Automate(i + j * 10, 60, 30, 1, sketch.createVector(2 + 60 * i, 31 * j), sketch);
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

// function initGrid() {
//     let grid = [];
//     for (let i = 0; i < c; i++) {
//         grid[i] = 0;
//     }
//     grid[Math.floor(c / 2)] = 1;
//     codeP.html(code);
//     return grid;
// }


// function getRule(n, grid) {
//     let val = 0;
//     val += grid[n - 1] * 4;
//     val += grid[n] * 2;
//     val += grid[n + 1];
//     val = Math.pow(2, val) & code;
//     return (val > 0 ? 1 : 0);
// }

// function nextGen(grid) {
//     let next = [];
//     for (let i = 0; i < c; i++) {
//         next[i] = getRule(i, grid);
//     }
//     return next;
// }