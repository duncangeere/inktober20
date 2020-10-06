// To make this skech work, run `npm start` in the root directory

var r = new Rune({
    container: "body",
    width: 794,
    height: 562,
    debug: true
});

function graphic() {

    // Page variables
    const margin = 30;
    const w = r.width - (margin * 2);
    const h = r.height - (margin * 2);

    // Create group to hold shapes
    const grp = r.group(margin, margin)

    const circles = 2500; // number of attempts to draw points
    const o_rad = 10; // radius of graphics - uncomment to hardcode
    const o_sep = 3; // distance between points
    const o_arr = []; // array to hold already-draw points

    const ears = [];
    ears.push(r.circle(w/2, h-60, 200, 200, grp).fill("none").stroke("none"))
    ears.push(r.circle(3*w/11, 2*h/5, 100, 100, grp).fill("none").stroke("none"))
    ears.push(r.circle(8*w/11, 2*h/5, 100, 100, grp).fill("none").stroke("none"))

    // Create all the circles
    for (let i = 0; i < circles; i++) {

        // Generate a random radius within limits (instead of hardcoded version a few lines up)
       // const o_rad = Rune.random(10,40)

        // Reset the number of tries to 0
        let tries = 0;
        let loc;

        // Generate a location and increment the trials counter
        do {
            loc = new Rune.Vector(Math.random() * w, Math.random() * h);
            tries += 1

            // Then check if it overlaps and repeat if it does or if there are too many tries
        } while ((checkOverlap(loc, o_rad, o_arr, o_sep) || checkOverlap(loc, o_rad, ears, o_sep)) && tries < 100)

        // If it's not overlapping anything...
        if (tries < 100) {

            // Get the sketch and plot it at location with size o_rad * 2
            getAndDraw(loc.x, loc.y, grp, o_rad * 2);

            // Save the details as an object
            const savedLoc = { state: { x: loc.x, y: loc.y, radius: o_rad } };

            // Push that object into the array
            o_arr.push(savedLoc);
        }
    }

    // Function to check if a given point overlaps with any of an array of existing graphics
    // newPos => point vector {state: {x: x, y: y, radius: radius}}
    // newSize => radius or size of graphic at that point
    // allcircs => array of existing graphics to loop through
    // sep => desired distance between graphics
    function checkOverlap(newPos, newSize, allcircs, sep) {

        // Check circles don't go out of bounds 
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


    // Function to fetch a quickdraw sketch from a node.js server then draw it
    // x => x position
    // y => y position
    // grp => containing group
    // scale => size of sketch
    async function getAndDraw(x, y, grp, scale) {

        await fetch("/mouse").then(response => response.json()).then(data => {

            quickDraw(data.drawing, x, y, grp, scale)
            r.draw();

        }).catch(err => console.error(err));
    }

    // Function to raw a sketch from the quickDraw dataset
    // array => array of x and y positions
    // x => x position
    // y => y position
    // grp => containing group
    // scale => size of sketch
    function quickDraw(array, x, y, grp, scale) {

        // Calculate scale factor
        const sf = scale / 255;

        // Start the path
        const sktch = r.path(x, y, grp).fill("none")

        // Loop over the array of strokes
        for (let line of array) {

            // Scale the points to the desired graphic width
            const xpoints = line[0].map(x => (x * sf) - scale / 2);
            const ypoints = line[1].map(y => (y * sf) - scale / 2);

            // Move the drawing cursor to the first point
            sktch.moveTo(xpoints[0], ypoints[0])

            // Loop over the rest of the points and draw to them in turn
            for (let i = 1; i < xpoints.length; i++) {
                sktch.lineTo(xpoints[i], ypoints[i])
            }
        }
    }
}


// Draw it 
graphic();