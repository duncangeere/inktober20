'use strict'

const r = new Rune({
    container: "body",
    width: 794,
    height: 560,
    debug: true
});

function graphic() {

	// Sketch parameters
    const lines = 80; // Number of lines
    const grp = r.group(0, 0); // Group to hold the lines
    const detail = 3000; // Number of x points (fewer and you get some clumping)
    const slope = Rune.random(0.1, 0.25); // How tall the dune gets
    const slopeWidth = Rune.random(4, 12); // Range of values for the inflection point

    // Loop over the lines
    for (let y = r.height / 2; y < r.height * 2; y += r.height / lines) {

    	// Draw the line
        const line = r.path(0, 0, grp).moveTo(0, y).fill("none")

        // Tracking y modification
        let dy = 0; 

        // Calculating inflection point
        const xInflectionPoint = (r.width / 2) + Rune.map(y, 0, r.height, -r.width / slopeWidth, r.width / slopeWidth)

        // Loop over each point of detail;
        for (let x = 0; x < r.width; x += r.width / detail) {

        	// Calculate the angle for the sin wave at that point
            const angle = Rune.map(x, 0, r.width, 0, Math.PI)

            // Modify dy by different values depending if the inflection point has been passed
            if (x < xInflectionPoint) {
                dy -= Math.sin(angle) * slope
            } else {
                dy -= Math.sin(angle + 90) * slope
            }

            // Draw line to next point
            line.lineTo(x, y + dy);
        }
    }
}

// Draw it 
graphic();
r.draw();