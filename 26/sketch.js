'use strict'

const r = new Rune({
    container: "body",
    width: 794,
    height: 560,
    debug: false
});

function graphic() {

    // Set up noise
    const noise = new Rune.Noise().noiseDetail(4, 0.25);
    const nFac = 0.01; // Higher numbers are more zoomed out
    const baseRotation = Math.round(Rune.random(360));

    // Make flow field
    const nCols = r.width
    const nRows = r.height
    const nGrid = [];

    for (let i = 0; i < nRows; i++) {
        const nRow = [];

        for (let j = 0; j < nCols; j++) {
            const n = noise.get(i * nFac, j * nFac);
            const rot = baseRotation + Math.round(Rune.map(n, 0, 1, 0, 360));
            const vector = new Rune.Vector(1, 0).rotate(rot);
            nRow.push(vector);
        }

        nGrid.push(nRow)
    }

    // Draw flow vectors for debug
    if (r.debug) {

        const rows = 60;
        const cols = Math.round(rows * 1.414);
        const len = 8;

        for (let x = 0; x < r.width; x += r.width / cols) {
            for (let y = 0; y < r.height; y += r.height / rows) {
                const vec = nGrid[Math.floor(y)][Math.floor(x)];
                r.line(x, y, x + vec.x * len, y + vec.y * len).stroke(0,0.1);
            }
        }
    }


    // Page setup
    const margin = 50;
    const grp = r.group(0, 0).rotate(Rune.random(0,360), r.width/2, r.height/2);

    // Sketch parameters
    const streamers = 300; // Number of flow lines
    const avgSteps = 30; // Avg of timesteps per flow line
    const stepVar = 10; // Variaiblity of number of steps per line
    const stepLen = 5; // Distance moved per step
    const radius = 150; // Radius of circle

    // Create a shape in the centre to anchor vectors on
    const shape = new Rune.Circle(r.width/2, r.height/2, radius, grp)
    				.toPolygon({spacing: 2 * Math.PI * radius / 1.5})

    // Make a vector at the centre of the canvas
    const centre = new Rune.Vector(r.width/2, r.height/2);

    // Loop over number of streamers
    for (let i = 0; i < streamers; i++) {

    	// Figure out step number for that streamer
    	const steps = Rune.random(avgSteps - stepVar, avgSteps + stepVar);

    	// Get start coordinates
    	const point = shape.vectorAt(i/streamers)

    	// Draw the sreamer there
    	streamer(centre.x + point.x, centre.y + point.y, steps, stepLen, nGrid, margin, grp);
    }

    // Vector streamer function
    function streamer(x, y, steps, stepLen, grid, margin, grp) {

        // Create a path
        const s = r.path(x, y, grp).moveTo(0, 0).fill("none");
        // Set up a vector to track current position
        let pos = new Rune.Vector(0, 0);

        // Loop over path steps
        for (let step = 0; step < steps; step++) {

            // Get flow vector at that location
            const flowVec = grid[Math.floor(y + pos.y)][Math.floor(x + pos.x)];

            // Calculate next point
            const newPos = new Rune.Vector(pos.x + flowVec.x * stepLen, pos.y + flowVec.y * stepLen);

            // Check bounds
            if (inBounds(x+newPos.x, y+newPos.y, margin)) {
            	
            	// Draw a line to the next point
            	s.lineTo(newPos.x, newPos.y);

            	// Update current position
            	pos = newPos;
            }
        }

        // Return the path
        return s;
    }

    // Check whether an x and y coordinate are within bounds
    function inBounds(x, y, margin) {
    	return (x > margin && x < r.width - margin && y > margin && y < r.height - margin)
    }

}

// Draw it 
graphic();
r.draw();