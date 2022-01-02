let canvas2;
let grille = [];
let lignes = [];
let inc = 2;
let lig = 50,
    col = 30;
let regle = 0;

function initGrille() {
    grille = [];
    for (let i = 0; i < col; i++) {
        grille[i] = 0;
    }
    grille[floor(col / 2)] = 1;
}

function setup() {
    canvas2 = createCanvas(600, 300);
    canvas2.parent('sketch-Atomate_11');
    initGrille();
    lignes.push(grille);
}

function applyRegle(n) {
    let val = 0;
    val += grille[n - 1] * 4;
    val += grille[n] * 2;
    val += grille[n + 1];
    val = pow(2, val) & regle;
    return (val > 0 ? 1 : 0);
}

function nextGen() {
    let next = [];
    for (let i = 0; i < col; i++) {
        next[i] = applyRegle(i);
    }
    grille = next;
    lignes.push(grille);
}

function draw() {
    // background(51);
    // for (let j = 0; j < lignes.length; j++) {
    //     for (let i = 0; i < col; i++) {
    //         const x = i * inc;
    //         const y = j * inc;
    //         fill(255 * lignes[j][i]);
    //         square(x, y, inc);
    //     }
    // }
}