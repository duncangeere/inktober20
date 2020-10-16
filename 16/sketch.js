'use strict'

const r = new Rune({
    container: "body",
    width: 794,
    height: 560,
    debug: true
});

function graphic() {

    // User constants
    const iterations = 1; // How many flowfields to generate
    const pSteps = 500; // number of steps in path (length of path)
    const lines = 20; // number of paths
    const res = 0.01; // Grid detail
    const octaves = 4; // noise octaves
    const falloff = 0.0001; // noise falloff
    const rockProps = { width: 20, height: 80, noseHeight: 10, finHeight: 10 }; // Rocket properties

    // Calculated constants
    const left_x = Math.floor(r.width * -0.5);
    const right_x = Math.floor(r.width * 1.5);
    const top_y = Math.floor(r.height * -0.5);
    const bottom_y = Math.floor(r.height * 1.5);
    const sLength = r.width * 0.001; // individual step length in path
    const resolution = Math.floor(r.width * res);
    const cols = (right_x - left_x) / resolution;
    const rows = (bottom_y - top_y) / resolution;

    const exhaust = r.group(0, 0)


    // Loop over the iterations
    for (let iter = 0; iter < iterations; iter++) {

        // Initiatise the noise
        const rNoise = new Rune.Noise().noiseDetail(octaves, falloff)

        // Store the field in a group
        let field = r.group(0, 0);

        // Init empty grid
        let grid = [];
        for (let i = 0; i < cols; i++) { grid[i] = []; }

        // Fill grid with angles
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {

                const scaledX = col * 0.05
                const scaledY = row * 0.05

                const noiseVal = rNoise.get(scaledX, scaledY)

                let angle = Rune.map(noiseVal, 0, 1, 0, 2 * Math.PI)

                grid[col][row] = angle;
            }
        }

        // Define base of rocket
        const startPoint = new Rune.Vector(Rune.random(r.width / 3, 2 * r.width / 3), Rune.random(r.height / 3, 2 * r.height / 3));

        let x_o = startPoint.x - left_x;
        let y_o = startPoint.y - top_y;

        // Figure out what the col/row index is of that point
        let col_i = Math.floor(x_o / resolution);
        let row_i = Math.floor(y_o / resolution);

        // Grab the angle from that index
        const angle = grid[col_i][row_i];

        // Draw the rocket
        const rocket = r.polygon(startPoint.x, startPoint.y).fill("red").stroke("none")
            .lineTo(-rockProps.width / 2 - rockProps.finHeight, 0)
            .lineTo(-rockProps.width / 2, -rockProps.finHeight)
            .lineTo(-rockProps.width / 2, -rockProps.height)
            .lineTo(0, -rockProps.height - rockProps.noseHeight)
            .lineTo(rockProps.width / 2, -rockProps.height)
            .lineTo(rockProps.width / 2, -rockProps.finHeight)
            .lineTo(rockProps.width / 2 + rockProps.finHeight, 0)
            .rotate(Rune.degrees(angle) - 90, startPoint.x, startPoint.y);

        // Draw exhaust flowlines
        for (let i = 0; i < lines; i++) {
            const jiggle = new Rune.Vector(Rune.random(1, 10), 0).rotate(Rune.random(360));
            const x = startPoint.x + jiggle.x;
            const y = startPoint.y + jiggle.y;
            flowLine(x, y, pSteps, sLength, grid, exhaust)
        }


    }

    // Define flowline function
    function flowLine(x, y, pathSteps, stepLength, grid, grp) {

        // Create a path
        let flowline = r.path(0, 0, grp).moveTo(x, y)
            .fill("none")
            .stroke(new Rune.Color(0).clearer(0.5))
            .strokeCap("round")

        // Loop over each step in the path
        for (let i = 0; i < pathSteps; i++) {

            // Plot a line to x, y
            flowline.lineTo(x, y);

            // Figure out where the canvas point should be relative to grid
            let xOff = x - left_x;
            let yOff = y - top_y;

            // Figure out what the col/row index is of that point
            const colIndex = Math.floor(xOff / resolution);
            const rowIndex = Math.floor(yOff / resolution);

            // Grab the angle from that index
            const gridAngle = grid[colIndex][rowIndex];

            // Figure out how far away the next step is
            const xStep = stepLength * Math.cos(gridAngle);
            const yStep = stepLength * Math.sin(gridAngle);

            // Locate the next step point
            x += xStep;
            y += yStep;

        }

        return flowline;
    }


}

// Draw it 
graphic();
r.draw();