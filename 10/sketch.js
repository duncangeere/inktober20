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
    const grp2 = r.group(margin, margin)

    // Possible range of colours (not really relevant for plotter, but it's nice to have in the generator)
    const colourWidth = 100;

    // One wasn't enough, three was too many
    aurora(100, grp);
    aurora(200, grp2);

    function aurora(lines, grp) {

        // Noise variables
        const noise = new Rune.Noise().noiseDetail(4, 0.5);
        const colFac = 0.02 // Noise multiplication factor for colour
        const yFac = 0.005 // Noise multiplication factor for y position
        const lFac = 0.03 // Noise multiplication factor for length

        // Get a centre hue - again not relevant for plotter
        const centreHue = Rune.random(180,270);

        for (let i = 0; i < lines; i++) {

            // Figuring out line position
            const x = i * w / lines;
            const y1 = 0.5 * h * noise.get(x * yFac, 0); // top of line
            const y2 = 0.5 * h * noise.get(0, i * lFac) // bottom of line

            // Figuring out line colour - again not relevant for plotter
            const colourMod = -colourWidth/2 + (colourWidth * noise.get(x * colFac, 0))
            colour = new Rune.Color("hsv", centreHue + colourMod, 100, 70)

            // Draw line
            r.line(x, y1, x, y2, grp).fill("none").stroke(colour).strokeWidth(2);
        }
    }
}

// Draw it 
graphic();
r.draw();