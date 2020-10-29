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
    const w = r.width - margin * 2;
    const h = r.height - margin * 2;
    const grp = r.group(margin, margin);

    // Sketch variables
    const time = 24;
    const timeHeight = h / time - 3;
    const dancers = 6;
    const posWidth = 24;
    const staveWidth = posWidth * 4;
    const gutter = (w - (staveWidth * dancers)) / dancers - 1

    // Positional possibilities
    const side = ["left", "right"];
    const posX = ["left", "mid", "right"];
    const posY = ["forward", "mid", "back"];
    const posZ = ["high", "middle", "low"];

    // Loop over each dancer
    for (let dancer = 0; dancer < dancers; dancer++) {
        const x = (staveWidth / 2) + (dancer * (gutter + staveWidth));
        const g = r.group(x, 0, grp);

        // Draw staves
        r.line(0, 0, 0, h, g);
        r.line(-posWidth, 0, -posWidth, h, g);
        r.line(posWidth, 0, posWidth, h, g);

        // loop over each time point
        for (let t = 0; t < time; t++) {

        	// Calculate position
            const pos = new Rune.Vector(0, h - (t * h/time));

            // Loop over limbs
            for (let i = -1; i < 2; i++) {

            	// Calculate x offset of stave
                const xoff = i * staveWidth / 4

                // Small chance of no dance!
                if (Math.random() > 0.2) {

                	// Randomise a dance move
                    laba(pos.x + xoff, pos.y, side[randInt(2)], posX[randInt(3)], posY[randInt(3)], posZ[randInt(3)], g)
                }
            }


        }

    }

    // Function to draw a labanotation shape
    // x, y => x and y co-ords
    // side => any of "left", "right"
    // xPos => any of "left", "mid", "right"
    // yPos => any of "forward", "mid" "back"
    // zPos => any of "high", "middle", "low"
    // grp => group to add the shape to
    function laba(x, y, side, xPos, yPos, zPos, grp) {

        // Side of the body
        let dist;
        if (side == "left") dist = -posWidth / 2 + posWidth / 8;
        if (side == "right") dist = posWidth / 2 - posWidth / 8;

        // Drawing the shapes
        const poly = r.polygon(x, y, grp);

        // Forward
        if (xPos == "left" && yPos == "forward") {
            poly.lineTo(-dist, 0);
            poly.lineTo(-dist, -timeHeight);
            poly.lineTo(0, -timeHeight + timeHeight / 3);
            poly.lineTo(0, 0);
        }

        if (xPos == "mid" && yPos == "forward") {
            poly.lineTo(dist, 0);
            poly.lineTo(dist, -timeHeight);
            poly.lineTo(dist / 2, -timeHeight);
            poly.lineTo(dist / 2, -timeHeight + timeHeight / 3);
            poly.lineTo(0, -timeHeight + timeHeight / 3);
            poly.lineTo(0, 0);
        }

        if (xPos == "right" && yPos == "forward") {
            poly.lineTo(dist, 0);
            poly.lineTo(dist, -timeHeight);
            poly.lineTo(0, -timeHeight + timeHeight / 3);
            poly.lineTo(0, 0);
        }

        // Middle
        if (xPos == "left" && yPos == "mid") {
            poly.lineTo(dist, -timeHeight / 2);
            poly.lineTo(0, -timeHeight);
            poly.lineTo(0, 0);

        }

        if (xPos == "mid" && yPos == "mid") {
            poly.lineTo(dist, 0);
            poly.lineTo(dist, -timeHeight);
            poly.lineTo(0, -timeHeight);
            poly.lineTo(0, 0);
        }

        if (xPos == "right" && yPos == "mid") {
            poly.lineTo(dist, 0);
            poly.lineTo(dist, -timeHeight);
            poly.lineTo(0, -timeHeight / 2);
            poly.lineTo(dist, 0);
        }

        // Back
        if (xPos == "left" && yPos == "back") {
            poly.lineTo(dist, 0);
            poly.lineTo(dist, -timeHeight);
            poly.lineTo(0, -timeHeight);
            poly.lineTo(0, -timeHeight / 3);
            poly.lineTo(dist, 0);
        }

        if (xPos == "mid" && yPos == "back") {
            poly.lineTo(dist, 0);
            poly.lineTo(dist, -timeHeight);
            poly.lineTo(0, -timeHeight);
            poly.lineTo(0, -timeHeight / 3);
            poly.lineTo(dist / 2, -timeHeight / 3);
            poly.lineTo(dist / 2, 0);
            poly.lineTo(dist, 0);
        }

        if (xPos == "right" && yPos == "back") {
            poly.lineTo(dist, -timeHeight / 3);
            poly.lineTo(dist, -timeHeight);
            poly.lineTo(0, -timeHeight);
            poly.lineTo(0, 0);
        }

        // Height determines fill style
        if (zPos == "high") highFill(poly);
        if (zPos == "middle") medFill(poly, grp);
        if (zPos == "low") lowFill(poly);

        // Return the polygon if necessary
        return poly;
    }

    // Fill functions
    // poly => any Rune polygon
    function lowFill(poly) {
        poly.fill(0);
    }

    function medFill(poly, grp) {
        poly.fill("none")
        const p = poly.centroid();
        r.circle(poly.state.x + p.x, poly.state.y + p.y, 1, grp).fill("none")
        if (p.x == 0) return "flag"
    }

    function highFill(poly) {
        poly.fill(175);
    }
}

// Draw it 
graphic();
r.draw();