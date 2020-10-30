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
    const w = r.width - margin * 2;
    const h = r.height - margin * 2;
    const grp = r.group(margin, margin)

    // Noise setup
    const noise = new Rune.Noise().noiseDetail(4, 0.25);
    const nFac = 0.01;

    // Sketch setup
    const hillDetail = 100;
    const maxRnd = 15; // Max jagginess
    const pathSegs = 5;
    const wobble = Rune.random(21,23);

    // Draw hill line - upward
    const p1 = r.path(0, h / 2, grp).fill("none");
    for (let d = 0; d < hillDetail; d++) {

        const dx = (d * w) / (2 * hillDetail);

        const d1 = Rune.map(dx, 0, w / 2, 0, -h / 2)
        const d2 = Rune.map(noise.get(dx * nFac), 0, 1, -maxRnd * 5, maxRnd * 5)
        const d3 = Rune.random(-maxRnd, maxRnd);
        const dy = d1 + d2 + d3;

        // Move first point to start location
        if (d == 0) {
            p1.moveTo(dx, dy)
        } else {
            // Draw line to next location
            p1.lineTo(dx, dy)
        }
    }

    // Draw hill line - downward
    for (let d = 0; d < hillDetail; d++) {

        const dx = w/2 + (d * w) / (2 * hillDetail);

        const d1 = Rune.map(dx, w/2, w, -h / 2, 0);
        const d2 = Rune.map(noise.get(dx * nFac), 0, 1, -maxRnd * 5, maxRnd * 5)
        const d3 = Rune.random(-maxRnd, maxRnd);
        const dy = d1 + d2 + d3 + h/20;

        p1.lineTo(dx, dy);
    }

    // Draw winding path
    const pl = r.path(w * 2/5, 3*h/4, grp).fill("none");
    const pr = r.path(w * 3/5, 3*h/4, grp).fill("none");

    for (let p = 0; p < pathSegs; p++) {

    	const dx = (p % 2 == 0) ? w/wobble : -w/wobble;
    	const dl = p * w/(2*wobble);
		const dr = -p * w/(2*wobble);

    	const dy = -p * (h*1.7) / pathSegs + (p * h/4);

    	if (p == 0) {
            pl.moveTo(dx + dl, 0);
            pr.moveTo(dx + dr, 0);
        } else {
            // Draw line to next location
            pl.lineTo(dx + dl, dy);
            pr.lineTo(dx + dr, dy);
        }
    }


}

// Draw it 
graphic();
r.draw();