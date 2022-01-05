class Automate {
    constructor(_code, _c, _l, _p, _pos, _p5) {
        this.pos = _pos;
        this.code = _code;
        this.c = _c;
        this.l = _l;
        this.pas = _p;
        this.grille = [];
        this.lignes = [];
        this.p5 = _p5;
        this.alive = true;
    }
    init() {
        this.lignes = [];
        for (let i = 0; i < this.c; i++) {
            this.grille[i] = 0;
        }
        this.grille[Math.floor(this.c / 2)] = 1;
        this.lignes.push(this.grille);
    }
    initRandom() {
        this.lignes = [];
        for (let i = 0; i < this.c; i++) {
            this.grille[i] = (Math.random() < 0.5) ? 1 : 0;
        }
        this.lignes.push(this.grille);
    }
    getRule(n) {
        let val = 0;
        if (n > 0 && n < this.c - 1) {
            val += this.grille[n - 1] * 4;
            val += this.grille[n] * 2;
            val += this.grille[n + 1];
        }
        val = Math.pow(2, val) & this.code;
        return (val > 0 ? 1 : 0);
    }

    update() {
        let next = [];
        for (let i = 0; i < this.c; i++) {
            next[i] = this.getRule(i);
        }
        this.grille = next;
        this.lignes.push(next);
        this.alive = (this.l > this.lignes.length);
    }

    show() {
        for (let j = 0; j < this.lignes.length; j++) {
            for (let i = 0; i < this.c; i++) {
                const x = i * this.pas + this.pos.x;
                const y = j * this.pas + this.pos.y;
                if (this.code === code) {
                    this.p5.stroke(0, 0, 255 * this.lignes[j][i]);
                    this.p5.fill(0, 0, 255 * this.lignes[j][i]);
                } else {
                    this.p5.stroke(255 * this.lignes[j][i]);
                    this.p5.fill(255 * this.lignes[j][i]);
                }
                this.p5.square(x, y, this.pas);
            }
        }
    }
}