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
    const grp = r.group(margin, margin);

    // Sketch variables
    const lines = 40;
    const detail = 120;
    const threshold = 0.93;
    const repetitions = 2;
    const maxRot = 5;

    // Loop over repetitions
    for (let rep = 0; rep < repetitions; rep++) {

    	// Create a group to hold that rep and rotate it a random amount
        const r_grp = r.group(0, 0, grp).rotate(Rune.random(-maxRot, maxRot), w / 2, h / 2)

        // Loop over the lines
        for (let i = 0; i < lines; i++) {

        	// Calculate y height
            const y = i * (h / lines);

            // Start a line
            const line = r.path(0, 0, r_grp).moveTo(0, y).fill("none");
            
            // This variable helps prevent the first two nodes trapdooring
            let first = 2; 

            // Loop over the detail
            for (let x = 0; x < w; x += w / detail) {

            	// If the threshold is exceeded and we're not in the first two nodes
                if (Math.random() > threshold && first <= 0) {

                	// Trigger the trapdoor!
                    line.lineTo(x - w / detail, y + w / detail);
                    line.moveTo(x, y);

                } else { 

                	// Otherwise just draw to the next node and decrement the "first" variable
                    line.lineTo(x, y);
                    first--;
                };
            }
        }
    }
}

// Draw it 
graphic();
r.draw();