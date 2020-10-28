'use strict'

const r = new Rune({
    container: "body",
    width: 794,
    height: 560,
    debug: false
});

function graphic() {

    // Page setup
    const margin = 30;
    const w = r.width - margin * 2;
    const h = r.height - margin * 2;
    const grp = r.group(margin, margin);
    const bGrp = r.group(margin, margin);

    // Sketch variables
    const minRad = 10;
    const maxRad = 50;
    const sep = 30;
    const attempts = 500;

    // Array to hold all the things
    const points = [];

    // Blimp variables
    const blimpWidth = 100;
    const blimpHeight = 50;
    const blimpCentre = new Rune.Vector(Rune.random(w / 3, 2 * w / 3), Rune.random(h / 3, 2 * h / 3));
    const leftPoint = new Rune.Vector(blimpCentre.x - blimpWidth / 2, blimpCentre.y)
    const rightPoint = new Rune.Vector(blimpCentre.x + blimpWidth / 2, blimpCentre.y)
    const facing = (Math.random() > 0.5) ? "left" : "right";

    // Draw the blimp
    // Body
    const blimp = r.ellipse(blimpCentre.x, blimpCentre.y, blimpWidth, blimpHeight, bGrp).fill("none");

    // Tail
    if (facing == "left") {
        r.rect(leftPoint.x - 8, leftPoint.y - 10, 8, 20, bGrp).fill("none")
        r.line(leftPoint.x - 8, leftPoint.y - 6, leftPoint.x, leftPoint.y - 6, bGrp);
        r.line(leftPoint.x - 8, leftPoint.y + 6, leftPoint.x, leftPoint.y + 6, bGrp);
        r.line(leftPoint.x - 8, leftPoint.y - 2, leftPoint.x, leftPoint.y - 2, bGrp);
        r.line(leftPoint.x - 8, leftPoint.y + 2, leftPoint.x, leftPoint.y + 2, bGrp);
    } else {
        r.rect(rightPoint.x, rightPoint.y - 10, 8, 20, bGrp).fill("none")
        r.line(rightPoint.x, rightPoint.y - 6, rightPoint.x + 8, rightPoint.y - 6, bGrp);
        r.line(rightPoint.x, rightPoint.y + 6, rightPoint.x + 8, rightPoint.y + 6, bGrp);
        r.line(rightPoint.x, rightPoint.y - 2, rightPoint.x + 8, rightPoint.y - 2, bGrp);
        r.line(rightPoint.x, rightPoint.y + 2, rightPoint.x + 8, rightPoint.y + 2, bGrp);
    }

    // Lines
    for (let i = 0; i <= 2; i++) {
        const yExtent = i * 20;
        r.ellipse(blimpCentre.x, blimpCentre.y, blimpWidth, 0.001 + yExtent, bGrp).fill("none");
    }

    // Undercarriage w/ windows
    r.rect(blimpCentre.x - 20, blimpCentre.y + blimpHeight / 2, 40, 10, bGrp).fill("none")
    r.rect(blimpCentre.x - 20 + 2, blimpCentre.y + blimpHeight / 2 + 3, 6, 4, bGrp).fill("none")
    r.rect(blimpCentre.x - 20 + 12, blimpCentre.y + blimpHeight / 2 + 3, 6, 4, bGrp).fill("none")
    r.rect(blimpCentre.x - 20 + 22, blimpCentre.y + blimpHeight / 2 + 3, 6, 4, bGrp).fill("none")
    r.rect(blimpCentre.x - 20 + 32, blimpCentre.y + blimpHeight / 2 + 3, 6, 4, bGrp).fill("none")

    // Put the blimp in the points array
    points.push({ state: { x: blimpCentre.x, y: blimpCentre.y, radius: 40 } });

    // Cloud drawing
    const data = [
        { "word": "cloud", "countrycode": "CZ", "timestamp": "2017-03-21 21:14:04.02355 UTC", "recognized": false, "key_id": "6608686266974208", "drawing": [
                [
                    [45, 7, 0, 1],
                    [0, 137, 205, 255]
                ]
            ] },
        { "word": "cloud", "countrycode": "NO", "timestamp": "2017-03-26 17:24:02.59541 UTC", "recognized": true, "key_id": "5303837856366592", "drawing": [
                [
                    [104, 86, 70, 41, 11, 3, 0, 4, 23, 48, 63, 61, 81, 96, 115, 120, 126, 126, 141, 169, 201, 222, 234, 240, 217, 233, 248, 254, 255, 242, 194, 181, 172, 152, 130, 100],
                    [107, 118, 124, 126, 117, 112, 104, 85, 65, 66, 80, 33, 7, 0, 0, 4, 17, 37, 21, 6, 3, 10, 22, 40, 60, 64, 73, 80, 94, 109, 118, 117, 129, 139, 139, 132]
                ]
            ] }
    ]

    // Mystery variable
    const pick = Math.random() > 0.95 ? 0 : 1;

    // Draw the clouds
    for (let a = 0; a < attempts; a++) {

        // Generate a random radius size
        const rad = Math.floor(Rune.random(minRad, maxRad));

        // Reset the number of tries to 0
        let tries = 0;
        let loc;

        // Generate a location and increment the trials counter
        do {
            loc = new Rune.Vector(Math.random() * w, Math.random() * h);
            tries += 1

            // Then check if it overlaps and repeat if it does or if there are too many tries
        } while (checkOverlap(loc, rad, points, sep) && tries < 100)

        // If it's not overlapping anything...
        if (tries < 100) {

            // Pick a random cloud
            const array = data[pick].drawing

            // Get the sketch and plot it at location with size rad * 2
            quickDraw(array, loc.x, loc.y, grp, rad * 2);

            // Save the details as an object
            const savedLoc = { state: { x: loc.x, y: loc.y, radius: rad } };

            // Push that object into the array
            points.push(savedLoc);
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

    console.log(points)
}


// Draw it 
graphic();
r.draw();