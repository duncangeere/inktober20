const r = new Rune({
    container: "body",
    width: 794,
    height: 562,
    debug: true
});

function graphic() {

    // Seting up margins
    const margin = 50;
    const w = r.width - (2 * margin);
    const h = r.height - (2 * margin);

    // Visual constants
    const lines = 100; // Number of lines
    const amplitude = 3; // Height of sine wave
    const wavelength = 50; // Wavelength of sine wave
    const threshold = Rune.random(300, 600); // Where slice should happen
    const xVar = Rune.random(0.5, 1.5) // Angle of slice
    const yVar = Rune.random(-1.5, 1.5) // Angle of slice

    // Group to hold the lines
    const lGrp = r.group(margin, margin);

    // Loop over the lines
    for (let y = 0; y < h; y += h / lines) {

        // Initiatise a value to keep track of whether slice threshold has been crossed
        let flipped = false;

        // Start a path
        let path = r.path(0, y, lGrp).fill("none");

        // Loop over x pixels
        for (let x = 0; x < w; x++) {

            // Check if slice threshold has passed
            let threshPassed = (xVar * x) + (yVar * y) > threshold;

            // If the slice threshold has been crossed and flipped hasn't happened yet
            if (!flipped && threshPassed) {

                flipped = true; // Track it
                path = r.path(x, y, lGrp).fill("none") // Start a new path
            }

            // Invert if threshold has been passed
            const slice = threshPassed ? 1 : -1

            // y modification
            const dy = Math.sin(x / wavelength) * amplitude * slice

            // draw the next point in the line
            path.lineTo(x, dy)
        }
    }
}

// Draw it 
graphic();
r.draw();