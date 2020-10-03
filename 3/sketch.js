const r = new Rune({
    container: "body",
    width: 794,
    height: 561,
    debug: true
});

function graphic() {

    const lines = 256;
    const size = 172;
    const jittermax = 8;

    bulky(r.width/5, r.height/2, lines, size, jittermax)
    bulky(r.width/2, r.height/2, lines, size, jittermax)
    bulky(r.width/(5/4), r.height/2, lines, size, jittermax)

    function bulky(x, y, lines, size, jittermax) {

    	// Calculating start positions for x and y
        const xStart = -size / 2;
        const yStart = -size / 2;

        // Group to hold the lines, rotated by a random amount
        const grp1 = r.group(x, y).rotate(Rune.random(-16, 16), x, y);

        // Loop over the lines
        for (i = 0; i < lines; i++) {

        	// Calculate start and endpoints
            const x1 = xStart + (i * size / lines) + Rune.random(-jittermax, jittermax),
                x2 = xStart + (i * size / lines) + Rune.random(-jittermax, jittermax),
                y1 = yStart + Rune.random(-jittermax, jittermax),
                y2 = yStart + size + Rune.random(-jittermax, jittermax);

            // Draw the line
            r.line(x1, y1, x2, y2, grp1).strokeWidth(1);
        }
    }
}

// Draw it 
graphic();
r.draw();