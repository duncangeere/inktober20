const r = new Rune({
    container: "body",
    width: 794,
    height: 562,
    debug: false
});

function graphic() {

    // Setting up page
    const margin = 50;
    const w = r.width - (margin * 2);
    const h = r.height - (margin * 2);
    const diamonds = r.group(margin, margin)
    const lines = r.group(margin, margin)

    // Grid constants
    const cols = 30;
    const rows = 20;
    const gutter = 0;
    const rowH = h / rows;
    const colW = w / cols;

    // Loop over the grid
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {

        	// Calculating grid corners and sides
            const x = col * colW;
            const y = row * rowH;

            const left = [0, rowH/2];
            const right = [colW, rowH/2];
            const top = [colW / 2, 0];
            const btm = [colW / 2, rowH];
            const centre = [colW/2, rowH/2];

            // Setting up groups to simplify placement and hold geometry
            const d = r.group(x, y, diamonds)
            const l = r.group(x, y, lines)

            // Modification variables for lines
            let x1, x2, y1, y2;

            // Draw diamond
            const rect = r.rect(gutter / 2, gutter / 2, colW - gutter, rowH - gutter, d).fill("none").stroke("#89CFF0")
            rect.rotate(45, centre[0], centre[1]);

            // Randomise line locations
            const rnd = Math.floor(Rune.random(0, 6));
            //const rnd = Math.floor(randomGaussian()*6);

            switch (rnd) {

            	// Left to top
                case 0:
                    x1 = left[0],
                    y1 = left[1],
                    x2 = top[0],
                    y2 = top[1];
                    break;

                // Left to right
                case 1:
                    x1 = left[0],
                    y1 = left[1],
                    x2 = right[0],
                    y2 = right[1];
                    break;

                // Left to bottom
                case 2:
                    x1 = left[0],
                    y1 = left[1],
                    x2 = btm[0],
                    y2 = btm[1];
                    break;

                // Top to right
                case 3:
                    x1 = top[0],
                    y1 = top[1],
                    x2 = right[0],
                    y2 = right[1];
                    break;

                // Top to bottom
                case 4:
                    x1 = top[0],
                    y1 = top[1],
                    x2 = btm[0],
                    y2 = btm[1];
                    break;

                // Right to bottom
                case 5:
                    x1 = right[0],
                    y1 = right[1],
                    x2 = btm[0],
                    y2 = btm[1];
                    break;
            }

            // Draw curve
            r.path(0,0,l).moveTo(x1,y1).curveTo(centre[0], centre[1], x2, y2).fill("none").strokeWidth(3).strokeCap("round")

        }
    }



}

// Draw it 
graphic();
r.draw();