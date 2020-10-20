'use strict'

const r = new Rune({
    container: "body",
    width: 794,
    height: 560,
    debug: false
});

function graphic() {

	// Specify a number of points
	const pointNum = 5000;

	// Define circle radius
	const circRad = 250;

	// Create an array and group to hold the points
	let points = [];
	const pGrp = r.group(r.width/2, r.height/2)

	// Specify centre point of canvas
	const centre = new Rune.Vector(r.width/2, r.height/2);

	// Loop over point number and add that 
	// many point vectors to the array
    for (let i = 0; i < pointNum; i++) {

    	// Create an object to hold point details
    	// First, it includes a magnitude
    	const point = {
    		mag: Rune.random(circRad)
    	};

    	// Add the position vector to the point object
    	point["pos"] = new Rune.Vector(point.mag, 0).rotate(Rune.random(360));

    	// Add that point to the points array
    	points.push(point);
    }

    // Visualise all the points if debug is true
    if (r.debug) {
    	
    	// Loop over the points array and draw circles
    	for (let point of points) {
    		r.circle(point.pos.x, point.pos.y, 3, pGrp).fill("none").stroke("red");
    	}
    }

    // Sort points in order of magnitude, lowest to highest
    points = points.sort((a, b) => a.mag > b.mag)

    // Set up a network array and group
    const network = [];
    const netGrp = r.group(r.width/2, r.height/2);

    // Add the centremost point to the network 
    network.push(points.shift());

    // Loop through the points array
    while (points.length > 0) {

    	// identify nearest network point
    	const netPoint = nearestVec(points[0], network)

    	// draw a line from the point to the nearest network point
    	r.line(netPoint.pos.x, netPoint.pos.y, points[0].pos.x, points[0].pos.y, netGrp);

    	// remove the point from the points array and add to network array
    	network.push(points.shift());
    }

    // Function that calculates the distance between two vectors
    function vecDist (v1, v2) {
    	return Math.sqrt((v1.x - v2.x)**2 + (v1.y - v2.y)**2);
    }

    // Function to find the nearest point in  
    // an array of points to another point
    function nearestVec (v, array) {
    	return array.reduce((acc, cur) => {

    		// Calculate distances of accumulator and current value
    		const accdist = vecDist(acc.pos, v.pos);
    		const curdist = vecDist(cur.pos, v.pos);

    		// Return whichever is closest
    		return accdist < curdist ? acc : cur;
    	})
    }

}

// Draw it 
graphic();
r.draw();