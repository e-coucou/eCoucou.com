let canvas;
let fichier;
let liste_mots = []
let mot;

let col = 0;

function preload() {
    fichier = loadJSON("/developpement/js/wordle/mots_off.json")
}

function keyPressed() {
    if (keyCode == BACKSPACE) {
        col = 120;
    } else if (keyCode == ENTER) {
        col = 10;
    } else if (key == 'A') {
        col = 200;
    }
}

function setup() {
    canvas = createCanvas(400, 400);
    canvas.parent("sketch-id");
    for (l in fichier) {
        liste_mots.push(fichier[l]);
    }
    mot = random(liste_mots);
    console.log(mot);
}

function draw() {
    background(col)
}