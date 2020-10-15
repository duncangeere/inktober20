'use strict'

const r = new Rune({
    container: "body",
    width: 794,
    height: 560,
    debug: true
});

function graphic() {

    
    // field constants
    const margin = 50;
    const w = r.width - (margin * 2)
    const h = r.height - (margin * 2)
    const all = r.group(margin, margin);

    const settlements = 1; // Number of settlements
    const s_rad = 40; // settlement radius
    const s_sep = 400; // separation between settlements
    const s_arr = [];

    const others = 2500; // number of non-settlement circs
    const o_rad = 6; // non-settlement radius
    const o_sep = 3; // separation between other circles
    const o_arr = [];

    const noise = new Rune.Noise().noiseDetail(4, 0.5);
    const nFac = 0.003 // Noise multiplication factor, higher = more zoomed out

    // Empty array to hold all the circles
    const allcircs = [];

    // Create all the settlements
    for (let i = 0; i < settlements; i++) {

        let loc;

        // Set overlappiing to true and reset the number of tries to 0
        let overlap = true;
        let tries = 0;

        // While overlapping is true and you've not tried too many times
        while (overlap && tries < 100) {

            // Generate a location
            loc = new Rune.Vector(Math.random() * w, Math.random() * h);

            // increment the number of tries
            tries += 1

            // Check to see if it's overlapping with an existing circle
            overlap = checkOverlap(loc, s_rad, allcircs, s_sep);
        };

        // If it's not overlapping anything, plot the circle
        if (!overlap) {
            const circ = r.circle(loc.x, loc.y, s_rad, all).fill("none");
            drawSettlement(circ, all); // Draw a settlement in it

            const savedLoc = { state: { x: loc.x, y: loc.y, radius: s_rad } };

            // Store it in arrays
            allcircs.push(savedLoc);
            s_arr.push(savedLoc);
        }
    }

    // Create all the non-settlements
    for (let i = 0; i < others; i++) {
        let loc;

        // Set overlappiing to true and reset the number of tries to 0
        let overlap = true;
        let tries = 0;

        // While overlapping is true and you've not tried too many times
        while (overlap && tries < 100) {

            // Generate a location
            loc = new Rune.Vector(Math.random() * w, Math.random() * h);

            // increment the number of tries
            tries += 1

            // Check to see if it's overlapping with an existing circle
            overlap = checkOverlap(loc, o_rad, allcircs, o_sep);
        };

        // If it's not overlapping anything, plot the circle
        if (!overlap) {

            // Draw the circle and fill it with the right colour (TK CHANGE)
            //const circ = r.circle(loc.x, loc.y, o_rad, all).fill(getNoiseCol(loc.x, loc.y));
            quickDraw(elements[getLandscapeElement(loc.x, loc.y)].drawing, loc.x - o_rad, loc.y - o_rad, all, o_rad * 2)

            const savedLoc = { state: { x: loc.x, y: loc.y, radius: o_rad } };

            // Store it in arrays
            allcircs.push(savedLoc);
            o_arr.push(savedLoc);
        }
    }

    // Function to return a colour based on noise
    function getLandscapeElement(x, y) {

        const level = noise.get(x * nFac, y * nFac);

        if (level > 0.70) { return 3 }; // Mountain
        if (level < 0.30) { return 0 }; // Ocean
        if (level > 0.5) { return 2 }; // Conifers
        if (level <= 0.5) { return 1 }; // Woodland/Grassland

    }

    // Function to check overlaps, 
    // takes a possible vector position and an array of circles as arguments
    function checkOverlap(newPos, newSize, allcircs, sep) {

    	if (newPos.distance(new Rune.Vector(w/2, h/2)) > (w/2 - newSize)) return true;

        if (newPos.x < newSize * 1.5 || newPos.x > w - newSize * 1.5 || newPos.y < newSize * 1.5 || newPos.y > h - newSize * 1.5) return true;

        // Loop over all the circles
        for (let circ of allcircs) {

            // Make a vector out of the current circle position
            const circPos = new Rune.Vector(circ.state.x, circ.state.y)

            // Compare the distance between that vector and the new position 
            // vector with the size. Reurn true if they overlap.
            if (circPos.distance(newPos) < circ.state.radius + newSize + sep) return true;
        };

        // Otherwise return false
        return false;
    }

    // Draw a shape from the quickDraw dataset
    function quickDraw(array, x, y, grp, scale) {

        // Calculate scale factor
        const sf = scale / 255;

        // Start the path
        const path = r.path(x, y, grp).fill("none")

        // Loop over the array of strokes
        for (let line of array) {

            // Scale the points to the desired graphic width
            const xpoints = line[0].map(x => x * sf);
            const ypoints = line[1].map(y => y * sf);

            // Check point arrays are the same length
            if (xpoints.length == ypoints.length) {

                // Move the drawing cursor to the first point
                path.moveTo(xpoints[0], ypoints[0])

                // Loop over the rest of the points and draw to them in turn
                for (let i = 1; i < xpoints.length; i++) {
                    path.lineTo(xpoints[i], ypoints[i])
                }

                // Error if point arrays aren't the same length
            } else { console.log("ERROR! xpoint and ypoint arrays are not equal in length") }
        }
    }


}

// Draw it 
graphic();
r.draw();