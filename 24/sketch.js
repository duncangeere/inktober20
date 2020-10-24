'use strict'

const r = new Rune({
    container: "body",
    width: 794,
    height: 560,
    debug: true
});

function graphic() {

	// Groups to hold different colours
    const grps = [r.group(r.width / 2, 2 * r.height / 5), 
    				r.group(r.width / 2, 2 * r.height / 5), 
    				r.group(r.width / 2, 2 * r.height / 5)]

   	// Sketch parameters
    const radius = 180; // Radius of circle
    const lineNum = 2000; // Number of lines
    const rotMax = 3; // Max rotation of lines (deg)

    // Loop over the lines
    for (let i = 0; i < lineNum; i++) {

    	// Get the origin point
        const point = new Rune.Vector(radius, 0).rotate(Rune.random(360));

        // Get the endpoint
        const end = new Rune.Vector(point.x, point.y + randomGaussian() * radius)

        // Get the rotation
        const rot = Rune.random(-rotMax, rotMax)

        // Pick a group randomly
        const grpNum = Math.floor(Rune.random(3));

        // Draw the line
        r.line(point.x, point.y, end.x, end.y, grps[grpNum]).rotate(rot, point.x, point.y);
    }

}

// Draw it 
graphic();
r.draw();