'use strict'

const r = new Rune({
    container: "body",
    width: 794,
    height: 560,
    debug: false
});

function graphic() {

    // Page setup
    const margin = 32;
    const w = r.width - margin * 2;
    const h = r.height;
    const staveNum = 3; // Number of staves
    const staveSep = margin / 4; // Separation of staves

    // Function listing and categorisation
    const s_functions = [circ, vertLine];
    const m_functions = [step, lineDot, corner, circLineSlope, invertedT, lineCurve, lineLineCirc, biggerCirc];
    const l_functions = [curveLineStep, circLineLine, circCurveLine];

    // Loop over the staves
    for (let stave = 0; stave < staveNum; stave++) {

    	// Positioning variables
        const baseY = h / 4 + (stave * h / 4); // Calc baseline Y for that stave
        const lineYs = [-staveSep * 4, 
        				-staveSep * 3,
        				-staveSep * 2, 
        				-staveSep, 
        				0, 
        				staveSep, 
        				staveSep * 2,
        				staveSep * 3,
        				staveSep * 4]; // Array of line heights

        // Debug - show stave lines
        //for (let lineY of lineYs) {
        //    r.line(margin, baseY + lineY, margin + w, baseY + lineY).stroke(175);
        //}

        // Time variables
        const time = 36; // Number of time points per stave
        const timeMargin = margin // Left side margin
        const tWidth = w - timeMargin / 2; // Width of note space

        // Loop over the time
        for (let t = 0; t < time; t++) {

        	// Get the x coord for that time point
            const x = margin + timeMargin / 2 + (t * time/2);

            // Pick a random number of notes for that time point - 0 to notesPerTime
            const choices = Math.floor(randomGaussian() * 7);
            for (let c = 0; c < choices; c++) {

            	// Get y-coordinate, picking a line in the process
                const y = baseY + lineYs[Math.floor(Rune.random(lineYs.length))]
                const noteSize = Rune.random(1);
                const pos = new Rune.Vector(x, y);
                const stroke = Math.random() > 0.9 ? "red" : 0

                // Choose which function to draw
                if (noteSize > 0.9) {
                	l_functions[Math.floor(Rune.random(l_functions.length))](pos.x,pos.y, stroke);
                } else if (noteSize < 0.3) {
                	m_functions[Math.floor(Rune.random(m_functions.length))](pos.x,pos.y, stroke);
                } else {
                	s_functions[Math.floor(Rune.random(s_functions.length))](pos.x,pos.y, stroke);
                }


            }

        }

    }


    // Function to draw a step-shaped path
    function step(x, y, stroke = 0, steps = 4, size = 8) {

        const p = r.path(x, y).moveTo(0, 0).fill("none").stroke(stroke); // Start a path

        // Loop over the steps
        for (let i = 0; i < steps; i++) {
            p.lineTo(size + size * i, size * i).lineTo(size + size * i, size + size * i);
        }

        return p
    }

    // Function to draw a line with a pair of enclosed dots below it
    function lineDot(x, y, stroke = 0, size = 8) {
        const g = r.group(x, y); // Group to hold the glyph
        r.line(0, 0, size * 4, 0, g).stroke(stroke);
        r.line(size * 3, 0, size * 3, size / 2, g).stroke(stroke);
        r.circle(size * 3, size, size / 2, g).fill("none").stroke(stroke);
        r.circle(size * 3, size, size / 8, g).fill("none").stroke(stroke);
        return g;
    }

    // Function to draw a corner
    function corner(x, y, stroke = 0, size = 8) {
        const p = r.path(x, y).moveTo(0, 0).fill("none").stroke(stroke);
        p.lineTo(size * 3, 0).lineTo(size * 3, size * 3);
        return p;
    }

    // Function to draw a curve line step sequence
    function curveLineStep(x, y, stroke = 0, size = 8) {
        const p = r.path(x, y).moveTo(0, 0).fill("none").stroke(stroke)
        p.curveTo(size, 0, size, size)
            .lineTo(size * 5, size)
            .lineTo(size * 5, size * 2).lineTo(size * 6, size * 2)
            .lineTo(size * 6, size * 3).lineTo(size * 7, size * 3)
            .curveTo(size * 7, size * 4, size * 8, size * 4);
        return p;
    }

    // Function to draw a circle line slope sequence
    function circLineSlope(x, y, stroke = 0, size = 8) {
        const g = r.group(x, y); // Group to hold the glyph
        r.circle(0, 0, size / 2, g).fill("none").stroke(stroke);
        r.line(size / 2, 0, size * 2, 0, g).stroke(stroke);
        r.line(size * 2, 0, size * 4, size * 2, g).stroke(stroke);
        return g
    }

    // Function to draw an inverted T shape
    function invertedT(x, y, stroke = 0, size = 8) {
        const g = r.group(x, y);
        r.line(0, 0, size * 3, 0, g).stroke(stroke);
        r.line(size * 2, 0, size * 2, -size * 2, g).stroke(stroke);
        return g;
    }

    // Function to draw a circle
    function circ(x, y, stroke = 0, size = 8) {
        return r.circle(x, y, size / 2).fill("none").stroke(stroke);
    }

    // Function to draw two nested circles
    function biggerCirc(x, y, stroke = 0, size = 8) {
        const grp = r.group(x, y)
        r.circle(0, 0, size, grp).fill("none").stroke(stroke);
        r.circle(0, 0, size / 2, grp).fill("none").stroke(stroke);
    }

    // Function to draw a vertical line
    function vertLine(x, y, stroke = 0, size = 8) {
        return r.line(x, y, x, y + size * 2).stroke(stroke);
    }

    // Function to draw a circle then two lines
    function circLineLine(x, y, stroke = 0, size = 8) {
        const g = r.group(x, y);
        r.circle(0, 0, size / 2, g).fill("none").stroke(stroke);
        r.line(0, size / 2, 0, size, g).stroke(stroke);
        r.line(0, size, size * 6, size, g).stroke(stroke);
        r.line(size * 6, size, size * 6, size * 2, g).stroke(stroke);
        return g;
    }

    // Function to draw two lines and a circle
    function lineLineCirc(x, y, stroke = 0, size = 8) {
        const g = r.group(x, y);
        r.line(0, 0, 3 * size, 0, g).stroke(stroke);
        r.line(3 * size, 0, 3 * size, size / 2, g).stroke(stroke);
        r.circle(3 * size, size, size / 2, g).fill("none").stroke(stroke);
        return g;
    }

    // Function to draw a line and a curve
    function lineCurve(x, y, stroke = 0, size = 8) {
        const p = r.path(x, y).moveTo(0, 0).fill("none").stroke(stroke);
        p.lineTo(size * 4, 0);
        p.curveTo(size * 4, size, size * 5, size);
        return p;
    }

    // Function to draw a circle, a curve and a line
    function circCurveLine(x, y, stroke = 0, size = 8) {
        const g = r.group(x, y);
        r.circle(size, 0, size / 2, g).stroke(stroke).fill("none")
        const p = r.path(0, 0, g).moveTo(0, 0).fill("none").stroke(stroke);
        p.curveTo(0, size, size, size);
        p.curveTo(size * 2, size, size * 2, 0);
        p.lineTo(size * 5, 0);
        return g;
    }

}

// Draw it 
graphic();
r.draw();