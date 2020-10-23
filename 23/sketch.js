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
    const lGrp = r.group(margin, margin);
    const rGrp = r.group(margin, margin);

 	// Sketch parameters
    const lines = 30; // How many lines
    const lineSep = 5; // Distance between lines
    const yStart = (h - lines * lineSep) / 2; // y-height the liens start at
    const detail = 300; // Detail points per line
    const splitVariance = 10; // Max width of split randomness
    const split = Rune.random(w / 3, 2 * w / 3); // Centre position of split
    const anchor = new Rune.Vector(split, yStart + (lines * lineSep)); // Point to rotate side around
    const rot = -10; // Rotation amount (deg)

    // Loop over lines
    for (let line = 0; line < lines; line++) {

    	// Get y-coordinate of line
        const y = line * lineSep;

        // Start a path
        let p = r.path(0, yStart + y, lGrp).fill("none")

        // Determine random split point
        const dSplit = split + Rune.random(-splitVariance, splitVariance);

        // Variable to track if split has happened yet
        let splat = false;

        // Loop over detail points
        for (let d = 0; d < detail; d++) {

        	// Get x-coordiante of detail point
            const x = d * w / detail;

            // Check if split occurs
            if (x > dSplit && !splat) {

            	// If so, start a new path
                p = r.path(x, yStart + y, rGrp).fill("none");
                splat = true; // and update tracker variable
            }

            // Draw line to next point (with correction if split has happened)
            if (!splat) {
                p.lineTo(x, 0);
            } else {
                p.lineTo(x - dSplit, 0);
            }
        }
    }

    // Rotate groups
    lGrp.rotate(rot, anchor.x, anchor.y)
    rGrp.rotate(-rot, anchor.x, anchor.y)
}

// Draw it 
graphic();
r.draw();