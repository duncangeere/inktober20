const r = new Rune({
    container: "body",
    width: 794,
    height: 562,
    debug: true
});

function graphic() {

    // Set margins
    const margin = 0;
    const w = r.width - (margin * 2);
    const h = r.height - (margin * 2);

    // Visual constants
    const offset = 100; // min distance of epicentre from sides
    const max = 25; // max magnitude of line jiggle
    const detail = 200; // points per line
    const lines = 10; // lines

    // Setting up some path groups
    const paths = [];
    const pGrp = r.group(0, 0);

    // Loop over each line
    for (let j = 1; j < lines; j++) {

        // Set up path once y is calculated
        let y = j * h / lines;
        const path = r.path(margin, y, pGrp).fill("none");

        // Loop over each point of detail, defining x in loop
        for (let x = 1; x <= w; x += w / detail) {

            // Jiggle y a little
            y = -max + (max * 2 * randomGaussian());
            path.lineTo(x, y);
        }

        // Add path to the paths array
        paths.push(path);
    }

    // Pick a random path and make it bold
    const chosen = Math.floor(Math.random() * paths.length);
    paths[chosen].strokeWidth(5);

    // Figure out epicentre of circles
    const y = (chosen + 1) * h / lines;
    const x = offset + Math.random() * (w - (2 * offset));

    // Draw circles
    const beams = r.group(x, y);
    for (let rad = offset * 0.3; rad <= w * 2; rad += offset * 0.3) {
        r.ellipse(0, 0, rad, rad, beams).fill("none").stroke(0, 0.3);
    };
};

// Draw it 
graphic();
r.draw();