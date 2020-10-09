const r = new Rune({
    container: "body",
    width: 794,
    height: 562,
    debug: true
});

function graphic() {

	// Basic bouncing ball physics engine
    // Adapted to Rune.js from Processing code by Daniel Shiffman:
	// https://natureofcode.com/book/chapter-2-forces/

	class Mover {

        // Each mover gets an initial x, y, speed and angle
        // and stores a position, velocity, and acceleration
        // The mover itself is a Rune path.
        constructor(_x, _y, _initialSpeed, _initialAngle) {
            this.pos = new Rune.Vector(_x, _y);
            this.vel = new Rune.Vector(0, -_initialSpeed).rotate(_initialAngle);
            this.acc = new Rune.Vector(0, 0);
            this.path = r.path(0,0,grp).moveTo(_x, _y).fill("none")
        }

        // Apply a given force by adding it to acceleration
        applyForce(force) {
            this.acc = this.acc.add(force)
        }

        // Update the position, velocity and acceleration
        update() {
            this.pos = this.pos.add(this.vel);
            this.vel = this.vel.add(this.acc);
            this.acc = new Rune.Vector(0, 0); // clear the acceleration
        }

        // Check if edges are hit, if so reverse the velocity (bit hacky, needs short timesteps to work)
        checkEdges() {
            if (this.pos.x > w) {
                this.pos.x = w;
                this.vel.x *= -1;
            } else if (this.pos.x < 0) {
                this.pos.x = 0;
                this.vel.x *= -1;
            }

            if (this.pos.y > h) {
                this.vel.y *= -1;
                this.pos.y = h;
            }
        }

        // Draw it
        draw() {
        	this.path.lineTo(this.pos.x, this.pos.y);
        }

    }

    // Page variables
    const margin = 50;
    const w = r.width - (margin * 2)
    const h = r.height - (margin * 2)

    // Groups and arrays to hold things
    const grp = r.group(margin, margin)
    const balls = r.group(margin, margin)
    const movers = [];

    // Sketch parameters
    const timeSteps = 700;
    const moverCount = 10;
    const gravity = new Rune.Vector(0,0.01);

    // Create a bunch of movers and push them to the array
    // Initial values for release speed and angle are semi-random
    for (let mover = 0; mover < moverCount; mover++) {
    	movers.push(new Mover(1,h-1,1+Math.random()*2, randomGaussian()*45))
    }

    // Loop over the timesteps
    for (let t = 0; t < timeSteps; t++) {
        // Loop over the movers
    	for (let mover of movers) {

            // Do all the things
    		mover.applyForce(gravity);
    		mover.checkEdges();
    		mover.update();
    		mover.draw();

            // On the last timestep, add a red ball
    		if (t == timeSteps-1) {
    			r.circle(mover.pos.x, mover.pos.y, 5, balls).fill(255,0,0).stroke("none");
    		}
    	}
    }
}

// Draw it 
graphic();
r.draw();