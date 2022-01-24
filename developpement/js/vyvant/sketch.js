let canvas;
let grille = [];
let c, l, p = 50;
let s, e;
let chaud, froid, neutre;
let inc = 1;

function setup() {
    canvas = createCanvas(500, 300);
    canvas.parent("sketch-id");
    c = width / p;
    l = height / p;
    // colorMode(HSB);
    chaud = color(255, 0, 0);
    froid = color(0, 0, 255);
    neutre = color(255, 255, 255);
    for (let i = 0; i < c; i++) {
        grille[i] = -100;
        grille[c * l - i - 1] = 100;
    }
    s = c;
    e = c * (l - 1);
    for (let i = s; i < e; i++) {
        grille[i] = 0;
    }
}

function update2(nb) {
    let next = [...grille];
    //
    for (let lig = 1; lig < l - 1; l++) {
        for (let col = 0; col < c; col++) {
            let id = lig * c + col;
            let v = grille[id] * inc / 100;
            if (col > 0 || col < c - 1) {
                next[id + 1] += grille[id + 1] + v
            }
            netx[id] + grille[id] * inc * 4 / 100;
        }
    }
    //
    return next;
}

function update(nb) {
    // let next = [];
    let next = [...grille];
    for (let i = 0; i < nb; i++) {
        let v = grille[i] * inc / 100;
        if (v < 0) {
            if (i < nb - c) next[i + c] += grille[i + c] + v;
            // if (i > c) next[i - c] += grille[i - c] + v * 0.7;
        } else {
            if (i > c) next[i - c] += grille[i - c] + v;
            // if (i < nb - c - 1) next[i + c] += grille[i + c] + v * 0.7;
        }
        // console.log(i, v);
        // if (i < (nb - c)) next[i + c] += grille[i + c] + v;
        if (i > (c + 1)) next[i - c] += grille[i - c] + v;
        if (i > 0) next[i - 1] += grille[i - 1] + v;
        // if (i < (nb - 1)) next[i + 1] += grille[i + 1] + v;
        next[i] += grille[i] * inc * 4 / 100;
        console.log(i, next[40], next[41], next[42], next[49]);
    }
    // on chauffe/refroidit en permancence
    for (let i = 0; i < c; i++) {
        next[i] = -100;
        next[c * l - i - 1] = 100;
    }
    console.log(next);
    return next;
}

function keyPressed() {
    if (key == ' ') {
        grille = update(grille.length);
    } else if (key == 'a') {
        grille = update2(grille.length);
    }
}

function draw() {
    background(0);
    // update();
    for (let i = 0; i < grille.length; i++) {
        let x = (i % c) * p;
        let y = floor(i / c) * p;
        let couleur;
        if (grille[i] < 0) {
            let intensite = map(grille[i], -100, 0, 1, 0);
            couleur = lerpColor(neutre, froid, intensite);
        } else {
            let intensite = map(grille[i], 0, 100, 0, 1);
            couleur = lerpColor(neutre, chaud, intensite);
        }
        noStroke();
        fill(couleur, 100, 100);
        rect(x, y, p);
    }
}