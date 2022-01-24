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
            this.case[i] = floor(random(0, 1));
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
        let next = [];
        while (a0 != a1) {
            a1 = a0;
            next = this.case;
            for (let i = 0; i < this.nb; i++) {
                if (this.case[i] >= 4) {
                    a0 += 1;
                    // this.count += 1;
                    next[i] -= 4;
                    next[i - 1] += 1;
                    next[i + 1] += 1;
                    next[i - this.c] += 1;
                    next[i + this.c] += 1;
                } else {
                    next[i] = this.case[i];
                }
            }
            this.case = next;
        }
        if (a0 > 0) this.histo.push(a0);
    }

    show() {
        for (let i = 0; i < this.nb; i++) {
            const x = i % this.c;
            const y = floor(i / this.c);
            fill(200, 200, 255, (3 - this.case[i]) * 92);
            stroke(255);
            square(x * this.pas, y * this.pas, this.pas);
        }
    }
}