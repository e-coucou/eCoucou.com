let canvas;
let grille;

function setup() {
    canvas = createCanvas(800, 400);
    canvas.parent("sketch-id");
    grille = new Grille(80, 80, 5);
}

function draw() {
    background(0, 0, 255);
    grille.update();
    grille.avalanche();
    grille.show();
}