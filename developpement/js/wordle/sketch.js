let canvas;
let fichier;
let liste_mots = []
let mot, mot_arr = [];
let propal = [],
    ligne = [],
    result = [];
let nb = 0,
    nbL = 0;
let w;
let succes = 0;

let col = 0;

function preload() {
    fichier = loadJSON("/developpement/js/wordle/mots_off.json")
}

function keyTyped() {
    if (((key >= 'a' && key <= 'z') || (key >= 'A' && key <= 'Z')) && (key != 'Enter')) {
        if (nb < 5) {
            propal[nb] = (key.toUpperCase());
            nb++;
        }
    }
}

function keyPressed() {
    if (keyCode === BACKSPACE) {
        result = [];
        if (nb > 0) {
            propal.pop();
            nb--;
        }
    } else if (keyCode == ENTER) {
        if (nb == 5) check_propal();
    }
}

function check_propal() {
    result = [];
    succes = 0;
    for (i = 0; i < nb; i++) {
        if (propal[i] == mot_arr[i]) {
            result[i] = color(50, 205, 50);
            succes++;
        } else {
            result[i] = color(45, 45, 45);
            for (j = 0; j < nb; j++) {
                if (i != j && propal[i] == mot_arr[j]) {
                    result[i] = color(255, 215, 0);
                }
            }
        }
    }
    ligne.push({
        p: propal,
        r: result,
        n: nbL
    })
    result = [];
    propal = [];
    nbL++;
    nb = 0;
}

function setup() {
    canvas = createCanvas(400, 600);
    w = width / 5;

    canvas.parent("sketch-id");
    for (l in fichier) {
        liste_mots.push(fichier[l]);
    }
    mot = random(liste_mots);
    for (l of mot) {
        mot_arr.push(l);
    }
    console.log(mot);
}


function draw() {
    background(0)
    textSize(w * 0.66);
    for (k of ligne) {
        for (i = 0; i < 5; i++) {
            stroke(0);
            strokeWeight(6);
            fill(k.r[i] || 45);
            square(i * w, k.n * 100, w - 2, 10);
            fill(255);
            noStroke();
            textAlign(CENTER, CENTER);
            text(k.p[i], (i + 1 / 2) * w, k.n * 100 + w / 2 + 3);
        }
    }
    for (i = 0; i < nb; i++) {
        fill(45);
        square(i * w, nbL * 100, w - 2);
        fill(255);
        textAlign(CENTER, CENTER);
        text(propal[i], (i + 1 / 2) * w, nbL * 100 + w / 2 + 3);
    }
    if (succes == 5) {
        fill(255);
        text('* GAGNE *', width / 2, 550);
        noLoop();
    }
    if (nbL == 5) {
        fill(130);
        text('Perdu !', width / 2, 550);
        noLoop();
    }
}