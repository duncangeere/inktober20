'use strict'

const r = new Rune({
    container: "body",
    width: 794,
    height: 559,
    debug: false
});

function graphic() {

    // Page variables
    const margin = 50;
    const w = r.width - (margin * 2);
    const h = r.height - (margin * 2);
    const stone = r.group(margin, margin);
    const moss1 = r.group(margin, margin);
    const moss2 = r.group(margin, margin);
    const moss3 = r.group(margin, margin);

    // Grid variables
    const rows = 120;
    const cols = Math.round(1.414 * rows);
    const rowH = h / rows;
    const colW = w / cols;

    // Sketch variables
    const jiggleMax = 2;
    const jiggleRot = 5;

    // Noise variables
    const noise = new Rune.Noise().noiseDetail(4, 0.5);
    const nFac = 0.003 // Noise multiplication factor, higher = more zoomed out

    // Loop over the grid
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {

            // Get coordinates and noise value
            const x = col * w / cols;
            const y = row * h / rows;
            const n = noise.get(x * nFac, y * nFac);

            // Get length of moss
            let len = 20 + randomGaussian() * 50;

            // If it's extending below the bottom then cut it off
            if (y + len > h) {
                len = h - y;
            }

            // Jiggle the x and y coords a little
            const jiggle = new Rune.Vector(Rune.random(jiggleMax)).rotate(Rune.random(360));
            const lineX = x + jiggle.x
            const lineY = y + jiggle.y
            const rot = Rune.random(-jiggleRot, jiggleRot)

            // Function to pick a moss group randomly
            const randomMossGroup = () => {
            	const rnd = Math.floor(Math.random(3))
            	if (rnd == 0) return moss1;
            	if (rnd == 1) return moss2;
            	if (rnd == 2) return moss3;
            }

            // Draw it if noise is greater than 0.5
            if (n > 0.55) {
                r.path(lineX, lineY, randomMossGroup())
                    .curveTo(0, len, jiggle.x * 2, jiggle.y * 2 + len)
                    .rotate(rot, x, y)
                    .stroke(new Rune.Color("hsv", Rune.random(106, 120), Rune.random(30, 40), Rune.random(10, 50)));

            } else {
            	// Small chance of drawing a very short line for texture
                if (Math.random() > 0.95) {
                    r.line(x, y, lineX, lineY, stone)
                        .stroke(100)
                }
            }
        }
    }
}


// Draw it 
graphic();
r.draw();