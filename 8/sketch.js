const r = new Rune({
    container: "body",
    width: 794,
    height: 562,
    debug: true
});

function graphic() {

    // Page variables
    const margin = 50;
    const w = r.width - (margin * 2);
    const h = r.height - (margin * 2);
    const grp = r.group(margin, margin);

    // Grid variables
    const rows = 15;
    const cols = Math.round(1.414 * rows);
    const rowH = h / rows;
    const colW = w / cols;

    // Noise variables
    const noise = new Rune.Noise().noiseDetail(4, 0.5);
    const nFac = 0.005 // Noise multiplication factor, higher = more zoomed out
    const maxPeturb = 10; // Max peturbation of a vertex

    // Make an array to hold the teeth
    const teeth = [];

    // Loop over the grid
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {

            // Calculate x and y pos
            const x = col * colW;
            const y = row * rowH;

            // Draw a tooth and push it to the array
            teeth.push(houndstooth(x, y, colW, rowH, 0, grp));
        }
    }

    // Loop over the teeth array
    for (let tooth of teeth) {

        // Get a peturbation value 
        const noiseResult = noise.get(tooth.state.x * nFac, tooth.state.y * nFac);

        // Only pick those where noise is high and multiply by maxPeturb
        const peturb = (noiseResult > 0.5) ? (noiseResult - 0.5) * 2 * maxPeturb : 0;

        // loop over that tooth's vertices
        for (let i = 0; i < tooth.state.vectors.length; i++) {

            // Peturb each vertex
            tooth.state.vectors[i] = tooth.state.vectors[i].add(new Rune.Vector(peturb, 0).rotate(Rune.random(360)));
        }
    }

    // Draw a houndstooth glyph at x, y with width and height and place it in grp
    function houndstooth(x, y, width, height, col, grp) {

        // Start a polygon
        let tooth = r.polygon(x, y, grp).fill(col).stroke("none")

        // Calculate sizes
        const xStep = width / 4;
        const yStep = height / 4;

        // Draw the tooth
        tooth.lineTo(-xStep, -yStep);
        tooth.lineTo(0, -yStep);
        tooth.lineTo(xStep, -2 * yStep);
        tooth.lineTo(xStep, -yStep);
        tooth.lineTo(2 * xStep, -yStep);
        tooth.lineTo(xStep, 0);
        tooth.lineTo(xStep, yStep);
        tooth.lineTo(-xStep, 3 * yStep);
        tooth.lineTo(-xStep, 2 * yStep);
        tooth.lineTo(0, yStep);
        tooth.lineTo(-xStep, yStep);
        tooth.lineTo(-xStep, 0);
        tooth.lineTo(-2 * xStep, yStep);
        tooth.lineTo(-3 * xStep, yStep);

        return tooth;
    }
}

// Draw it 
graphic();
r.draw();