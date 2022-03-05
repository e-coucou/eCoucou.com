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

let alpha;
let clavier = [
    ['A', 'Z', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['Q', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M'],
    ['Enter', 'Enter', 'W', 'X', 'C', 'V', 'B', 'N', 'Backspace', 'Backspace']
]

function preload() {
    fichier = loadJSON("/developpement/js/wordle/mots_off.json");
    alpha = loadJSON("/developpement/js/wordle/alphabet.json");
}

function aff_alph() {
    w_c = w / 2;
    w_h = w_c * 1.5;
    textSize(w_c * 0.4);
    for (i in alpha) {
        // console.log(alpha[i]);
        c = alpha[i];
        fill(c.t || 45);
        stroke(90);
        strokeWeight(1);
        rect(c.c * w_c, c.l * w_h + 6.4 * w, w_c * c.w, w_h, 6);
        fill(255);
        noStroke();
        textAlign(CENTER, CENTER);
        text(c.n, (c.c + c.w / 2) * w_c, c.l * (w_h) + w_h / 2 + 6.4 * w);
    }
}

// function keyTyped() {
//     console.log(key);
//     if (((key >= 'a' && key <= 'z') || (key >= 'A' && key <= 'Z')) && (key != 'Enter')) {
//         if (nb < 5) {
//             propal[nb] = (key.toUpperCase());
//             nb++;
//         }
//     }
// }

function check_key(key) {
    if (((key >= 'a' && key <= 'z') || (key >= 'A' && key <= 'Z')) && (key != 'Enter') && (key != 'Backspace')) {
        if (nb < 5) {
            propal[nb] = (key.toUpperCase());
            nb++;
        }
    } else if (key == 'Backspace') {
        result = [];
        if (nb > 0) {
            propal.pop();
            nb--;
        }
    } else if (key == 'Enter') {
        if (nb == 5) check_propal();
    }

}

function keyPressed() {
    check_key(key);
}

function mousePressed() {
    let w_c = w / 2;
    let w_h = w_c * 1.5;
    let h = 6.4 * w;
    let c = 0,
        l = 0;
    if (mouseY > h && mouseY < (h + 3 * w_h)) {
        l = floor((mouseY - h) / w_h);
        c = floor(mouseX / w_c);
        check_key(clavier[l][c]);
    }
}

function new_check() {
    succes = 0;
    ret = [];
    let X = {},
        Y = {};
    for (i = 0; i < 5; i++) {
        A = propal[i];
        B = mot_arr[i];
        if (!X[A]) {
            X[A] = [];
        }
        X[A].push(i);
        if (!Y[B]) {
            Y[B] = [];
        }
        Y[B].push(i);
    }
    for (x in X) {
        let nkC = X[x].length;
        let nOk = 0;
        for (i of X[x]) {
            if (Y[x]) {
                if (Y[x].length >= nkC + nOk) {
                    ret[i] = color(255, 215, 0);
                    if (!alpha[propal[i]]['t']) {
                        alpha[propal[i]]['t'] = color(255, 215, 0);
                    }
                    for (j of Y[x]) {
                        if (i == j) {
                            ret[i] = color(50, 205, 50);
                            alpha[propal[i]]['t'] = ret[i];
                            succes++;
                        }
                    }
                } else {
                    for (j of Y[x]) {
                        if (i == j) {
                            ret[i] = color(50, 205, 50);
                            succes++;
                            nOk++;
                        }
                    }
                }
            } else {
                ret[i] = color(75, 75, 75);
                alpha[propal[i]]['t'] = color(90, 90, 90);
            }
            nkC--;
        }
    }
    return ret;
}

function check_propal() {
    result = new_check();
    console.log('result new', result)
    // result = [];
    // succes = 0;
    // for (i = 0; i < 5; i++) {
    //     found = false;
    //     if (propal[i] == mot_arr[i]) {
    //         result[i] = color(50, 205, 50);
    //         alpha[propal[i]]['t'] = result[i];
    //         succes++;
    //         found = true;
    //     } else {
    //         result[i] = color(75, 75, 75);
    //         for (j = 0; j < 5; j++) {
    //             if (i != j && propal[i] == mot_arr[j]) {
    //                 result[i] = color(255, 215, 0);
    //                 if (!alpha[propal[i]]['t']) {
    //                     alpha[propal[i]]['t'] = color(255, 215, 0);
    //                 }
    //                 found = true;
    //             }
    //         }
    //     }
    //     if (!found) {
    //         alpha[propal[i]]['t'] = color(90, 90, 90);
    //     }
    // }
    // // check double lettre
    // for (i = 0; i < 5; i++) {
    //     for (j = i + 1; j < 5; j++) {
    //         if (propal[i] == propal[j]) {
    //             console.log('Doublon', propal[i]);
    //             // if ()
    //         }
    //     }
    // }
    // console.log('result original', result);
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
    canvas = createCanvas(400, 700);
    w = width / 5;

    canvas.parent("sketch-id");
    for (l in fichier) {
        liste_mots.push(fichier[l]);
    }
    mot = random(liste_mots);
    // mot = 'DEBIT';
    for (l of mot) {
        mot_arr.push(l);
    }
}


function draw() {
    background(0)
    textSize(w * 0.5);
    for (l = 0; l < 6; l++) {
        for (c = 0; c < 5; c++) {
            stroke(90);
            strokeWeight(3);
            fill(0);
            square(3 + c * (w), 5 + l * (w + 5), w - 7, 10);
        }
    }
    for (k of ligne) {
        for (i = 0; i < 5; i++) {
            stroke(0);
            strokeWeight(3);
            fill(k.r[i] || 90);
            square(3 + i * w, k.n * (w + 5) + 5, w - 7, 10);
            fill(255);
            noStroke();
            textAlign(CENTER, CENTER);
            text(k.p[i], (i + 1 / 2) * w, k.n * (w + 5) + w / 2 + 8);
        }
    }
    for (i = 0; i < nb; i++) {
        fill(45);
        square(3 + i * w, nbL * (w + 5) + 5, w - 7, 10);
        fill(255);
        textAlign(CENTER, CENTER);
        text(propal[i], (i + 1 / 2) * w, nbL * (w + 5) + w / 2 + 8);
    }
    if (succes == 5) {
        fill(color(50, 205, 50));
        rect(w * 0.5, height - 1.8 * w, 4 * w, 1.3 * w, 20);
        fill(255);
        text('* GAGNE *', width / 2, height - w);
        noLoop();
    } else if (nbL == 6) {
        fill(color(250, 50, 50));
        rect(w * 0.5, height - 1.8 * w, 4 * w, 1.3 * w, 20);
        fill(255);
        text(mot, width / 2, height - w);
        noLoop();
    } else aff_alph();
}