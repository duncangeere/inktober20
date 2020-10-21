'use strict'

const r = new Rune({
    container: "body",
    width: 794,
    height: 560,
    debug: true
});

function graphic() {

	// Page variables
    const margin = 50;
    const w = r.width - (margin * 2);
    const h = r.height - (margin * 2);
    const sqGrp = r.group(margin, margin);

    // Grid variables
    const rows = 9;
    const cols = Math.round(rows * 1.414);
    const gutter = 15;
    const rotFac = 2; // Greater is more rotation per module
    const sizeFac = 0.8; // Greater is more size variance per module

    const modWidth = (w - (gutter * cols)) / cols;
    const modHeight = (h - (gutter * rows)) / rows;

    // Line variables
    const lines = rows;
    const detail = 500; // Points per line
    const sinScale = 0.01; // Sine wave magnitude
    const lineGrp = r.group(margin, margin);

    // Loop over the columns
    for (let col = 0; col < cols; col++) {

    	// Calculate x value
        const x = (gutter / 2) + col * w / cols;

        // Calculate magnitude, which controls num of blocks, corner roundness, translation and rotation
        let mag = (cols - 3) - col;
        mag = mag >= 0 ? mag : 0; // Set to zero if it falls below zero

        // Loop over the rows
        for (let row = 0; row < rows; row++) {

        	// Calculate y coordinate
            const y = (gutter / 2) + row * h / rows;

            // Draw a peturbed rectangle at those coordinates
            const dx = sizeFac * Rune.random(-mag, mag);
            const dy = sizeFac * Rune.random(-mag, mag);

            r.rect(x + dx, y + dy, modWidth, modHeight, sqGrp)
                .round(Rune.map(col, 0, cols, 0, modWidth / 2))
                .fill("none").stroke(100)
                .rotate(Rune.random(-mag * rotFac, mag * rotFac), x + dx + modWidth / 2, y + dy + modHeight / 2);

            // Draw more peturbed rectangles, depending on mag
            for (let i = mag; i > 0; i--) {

                const dx = sizeFac * Rune.random(-mag, mag);
                const dy = sizeFac * Rune.random(-mag, mag);

                r.rect(x + dx, y + dy, modWidth, modHeight, sqGrp)
                    .round(Rune.map(col, 0, cols, 0, modHeight / 2))
                    .fill("none").stroke(100)
                    .rotate(Rune.random(-mag * rotFac, mag * rotFac), x + dx + modWidth / 2, y + dy + modHeight / 2);
            }
        }
    }

    // Loop over the number of lines
    for (let line = 0; line < lines; line++) {

    	// Calculate y coordinate
        const y = (line * (modHeight + gutter)) + (modHeight + gutter) / 2;

        // Start a path
        const l = r.path(0, y, lineGrp).moveTo(0, 0).fill("none").stroke("blue").strokeWidth(2);

        // Loop over the path detail
        for (let d = 0; d < detail; d++) {	

        	// Calculate an x coordinate
        	const x = d * w/detail;

        	// Calculate y-offset at that coordinate
            const dy = sinScale * (detail-d) * Math.sin(d/2);

            // Extend the path to the new coordinate
            l.lineTo(x, dy);
        }
    }
}

// Draw it 
graphic();
r.draw();