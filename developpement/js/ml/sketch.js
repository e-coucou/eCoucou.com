let canvas;
let data = [];
let m = 0,
    b = 0;

function setup() {
    canvas = createCanvas(400, 400);
    canvas.parent("sketch-id");
}

function mousePressed() {
    let x = map(mouseX, 0, width, 0, 1);
    let y = map(mouseY, 0, height, 1, 0);
    let p = createVector(x, y);
    data.push(p);
}

function gradient() {
    const rate = 0.05;
    for (let i = 0; i < data.length; i++) {
        let x = data[i].x;
        let y = data[i].y;
        let cible = m * x + b;
        let error = y - cible;
        m = m + error * x * rate;
        b = b + error * rate;
    }
}

function draw() {
    background(51);
    if (data.length > 1) gradient();
    for (let i = 0; i < data.length; i++) {
        let x = map(data[i].x, 0, 1, 0, width);
        let y = map(data[i].y, 0, 1, height, 0);
        fill(0, 255, 255);
        circle(x, y, 8);
    }
    stroke(255, 255, 0);
    let y1 = map(b, 0, 1, height, 0);
    let y2 = map((m + b), 0, 1, height, 0);
    line(0, y1, width, y2);
}