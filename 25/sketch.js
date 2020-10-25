'use strict'

const r = new Rune({
    container: "body",
    width: 794,
    height: 560,
    debug: true
});

function graphic() {

    // Page setup
    const margin = 50;
    const w = r.width - (margin * 2);
    const h = r.height - (margin * 2);
    const grps = [r.group(margin, margin), r.group(margin, margin), r.group(margin, margin)];

    // Sketch parameters
    const lines = 100;
    const detail = 1000;

    // Noise parameers
    const noise = new Rune.Noise().noiseDetail(4, 0.5);
    const nFac = 0.003 // Noise multiplication factor, higher = more zoomed out
    const maxPet = 2 * w / lines; // Max x.peturbation

    moirelines((x, y) => Rune.map(noise.get(x * nFac, y * nFac), 0, 1, -maxPet, maxPet), grps[0]); 
    moirelines((x, y) => Rune.map(noise.get((100 + x) * nFac, (100 + y) * nFac), 0, 1, -maxPet, maxPet), grps[1]);
    moirelines((x, y) => 0, grps[2]);

    function moirelines(dxfunc, grp) {

        for (let l = 0; l < lines; l++) {
            const x = l * w / lines;

            const p = r.path(x, 0, grp).fill("none");

            for (let d = 0; d < detail; d++) {
                const y = d * h / detail;
                const dx = dxfunc(x, y);

                if (d == 0) {
                    p.moveTo(dx, y);
                } else {
                    p.lineTo(dx, y);
                }

            }
        }

    }

}

// Draw it 
graphic();
r.draw();