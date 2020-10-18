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
    const w = r.width;
    const h = r.height - (margin * 2);
    const grp = r.group(0, margin);

    // Noise parameers
    const noise = new Rune.Noise().noiseDetail(4, 0.5);
    const nFac = 0.003 // Noise multiplication factor, higher = more zoomed out

    // Tornado parameters
    const tornadoes = 3; // Number of tornadoes
    const detail = 60; // Number of ellipses per tornado
    const wiggleMax = 80; // max divergence from upright
    const tWidth = 250; // top width
    const bWidth = 20; // bottom width
    const eHeight = 10; // height of ellipses

    //Loop over tornadoes
    for (let i = 1; i <= tornadoes; i++) {

    	// Figure out centre of column before noise
        const xBase = i * w / (tornadoes + 1);

        // Group to hold tornado ellipses
        const currGrp = r.group(xBase, 0, grp);

        // Loop over detail, calculating y position
        for (let y = 0; y < h; y += h / detail) {

        	// Calculate divergence from upright - where centre of ellipse is
        	const dx = Rune.map(noise.get(xBase * nFac, y * nFac), 0, 1, -wiggleMax, wiggleMax);
        	
        	// Calculate ellipse width
        	const eWidth = Rune.map(y, 0, h, tWidth, bWidth);

        	// Draw ellipse
        	r.ellipse(dx, y, eWidth, eHeight, currGrp).fill("none");
        }

    }

}

// Draw it 
graphic();
r.draw();