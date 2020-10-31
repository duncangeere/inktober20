'use strict'

const r = new Rune({
    container: "body",
    width: 794,
    height: 560,
    debug: false
});

function graphic() {

    // Layout
    const margin = 30;
    const w = r.width - margin * 2;
    const h = r.height - margin * 2;
    const g = r.group(margin, margin);
    const rows = 5
    const cols = Math.round(rows * 1.414);
    	
    // Bug variables
    const jiggleMax = 30; // Max peturbation from grid
    const minRad = 8; // radius
    const maxRad = 20; // radius
    const minLeg = 3; // leg length
    const maxLeg = 20; // leg length
    const minEye = 0.5; // eye size
    const maxEye = 3; // eye size
    const minWing = 1.5; // wing length
    const maxWing = 2.5; // wing length
    const minWingRot = 5; // wing spread
    const maxWingRot = 10; // wing spread

    const legAngles = [60, 90, 120, 240, 270, 300]; // Angles the legs are at

    // Loop over rows
    for (let row = 0; row < rows; row++) {

    	// Get y coordinate
        const y = row * h / rows + (h / (2 * rows));

        //Loop over columns
        for (let col = 0; col < cols; col++) {

        	// Get x coordinate
            const x = col * w / cols + (w / (2 * cols));

            // Create a group and peturb and rotate it
            const grp = r.group(x + Rune.random(-jiggleMax, jiggleMax), y + Rune.random(-jiggleMax, jiggleMax), g)
            				.rotate(Rune.random(360), x, y);

           	// Draw an insect at that point
            insect(0, 0, grp);
        }
    }

    // Function to draw a random insect at an x, y coordinate
    function insect(x, y, grp) {

    	// Generate some random properties
        const radius = Math.round(Rune.random(minRad, maxRad));
        const legLength = Math.round(Rune.random(minLeg, maxLeg));
        const eyeSize = Math.round(Rune.random(minEye, maxEye));
        const wingSep = radius/20;
        const wingSize = Math.round(Rune.random(minWing, maxWing)) * radius;
        const wingRot = Math.round(Rune.random(minWingRot, maxWingRot))+180;

        // Body
        r.circle(x, y, radius, grp).fill("none");

        // Legs
        for (let angle of legAngles) {
            r.line(0, radius, 0, radius + legLength, grp).rotate(angle, 0, 0);
        }

        // Eyes
        r.circle(-radius/5, radius - radius/5, eyeSize, grp).fill("none");
        r.circle(radius/5, radius - radius/5, eyeSize, grp).fill("none");

        // Wings
        r.path(-wingSep,radius/2, grp).curveTo(wingSize/3, 0, wingSize/3, wingSize)
        			.curveTo(wingSize/6, wingSize + Rune.random(5), 0, wingSize)
        			.lineTo(0, 0)
        			.rotate(-wingRot, -wingSep, radius/2)
        			.fill(50,0.5);

        r.path(wingSep,radius/2, grp).curveTo(-wingSize/3, 0, -wingSize/3, wingSize)
        			.curveTo(-wingSize/6, wingSize + Rune.random(5), 0, wingSize)
        			.lineTo(0, 0)
        			.rotate(wingRot, wingSep, radius/2)
        			.fill(50,0.5);


    }
}

// Draw it 
graphic();
r.draw();