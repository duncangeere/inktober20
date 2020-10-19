'use strict'

const r = new Rune({
    container: "body",
    width: 794,
    height: 560,
    debug: false
});

function graphic() {

	// Page setup
    const margin = 0;
    const w = r.width - (margin * 2);
    const h = r.height - (margin * 2);
    const grp = r.group(margin, margin);

    // Sketch parameters
    const steps = 20;
    const extent = 50;

    // Make six dizzywalkers spread across the canvas
    dizzyWalker(new Rune.Vector(w/4, h/3));
    dizzyWalker(new Rune.Vector(w/2, h/3));
    dizzyWalker(new Rune.Vector(3*w/4, h/3));
    dizzyWalker(new Rune.Vector(w/4, 2*h/3));
    dizzyWalker(new Rune.Vector(w/2, 2*h/3));
    dizzyWalker(new Rune.Vector(3*w/4, 2*h/3));

    // Function to create a dizzywalker
    function dizzyWalker(point) {

    	// Draw the starting bullseye
        r.circle(point.x, point.y, 5, grp).fill("none").stroke("red")
        r.circle(point.x, point.y, 10, grp).fill("none").stroke("red")
        r.circle(point.x, point.y, 15, grp).fill("none").stroke("red")

        // Initialise the path
        const p = r.path(0, 0, grp).moveTo(point.x, point.y).fill("none");

        // Loop over the number of steps
        for (let s = 0; s < steps; s++) {

        	// Randomly generate anchors and a target point
            const anchor1 = point.add(rndVec(extent));
            point = point.add(rndVec(extent));
            const anchor2 = point.add(rndVec(extent));

            // Draw a cubic bezier curve to the target point
            p.curveTo(anchor1.x, anchor1.y, anchor2.x, anchor2.y, point.x, point.y);
        }
    }

    // Function to generate a random vector with an approx magnitude
    function rndVec(mag) {
        return new Rune.Vector(randomGaussian()*mag, 0).rotate(Rune.random(360));
    }
}

// Draw it 
graphic();
r.draw();