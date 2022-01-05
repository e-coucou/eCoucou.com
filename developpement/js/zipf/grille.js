class Grille {
    constructor(_c, _l, _p) {
        this.c = _c;
        this.l = _l;
        this.pas = _p;
        this.nb = this.l * this.c;
        this.case = [];
        this.init();
        this.histo = [];
        this.count = 0;
    }

    init() {
        for (let i = 0; i < this.nb; i++) {
            this.case[i] = floor(random(0, 3));
        }
    }

    update() {
        const n = floor(random(this.nb));
        this.case[n] += 1;
        this.count += 1;
    }

    avalanche() {
        let a0 = 0,
            a1 = -1;
        while (a0 != a1) {
            a1 = a0;
            for (let i = 0; i < this.nb; i++) {
                if (this.case[i] >= 4) {
                    a0 += 1;
                    this.count += 1;
                    this.case[i] -= 4;
                    this.case[i - 1] += 1;
                    this.case[i + 1] += 1;
                    this.case[i - this.c] += 1;
                    this.case[i + this.c] += 1;
                }
            }
        }
        if (a0 > 0) this.histo.push(a0);
    }

    show() {
        for (let i = 0; i < this.nb; i++) {
            const x = i % this.l;
            const y = floor(i / this.l);
            fill(200, 200, 255, (3 - this.case[i]) * 92);
            stroke(255);
            square(x * this.pas, y * this.pas, this.pas);
        }
    }
}