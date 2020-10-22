'use strict'

const r = new Rune({
    container: "body",
    width: 794,
    height: 560,
    debug: false
});

function graphic() {

	// Sketch variables
    const lats = 15;
    const lons = Math.round(2*lats);
    const minLat = 6;

    const stkWid = 3;

    const grp = r.group(r.width / 2, r.height / 2);

    // Loop over the lines of longitude (around the circle)
    for (let lon = 0; lon < lons; lon++) {
        const around = lon * 360 / lons; // Get current coord
        const aroundPlus = (lon + 1) * 360 / lons; // Get next coord

        // Loop over the lines of latitude (outward from the centre)
        for (let lat = 0; lat < lats; lat++) {
            const outward = (lat+minLat)**2; // Get current coord
            const outwardPlus = (lat+minLat+1)**2; // Get next coord

            // Figure out the corners of each gridpoint
            const pos1 = new Rune.Vector(outward, 0).rotate(around);
            const pos2 = new Rune.Vector(outwardPlus, 0).rotate(around);
            const pos3 = new Rune.Vector(outwardPlus, 0).rotate(aroundPlus);
            const pos4 = new Rune.Vector(outward, 0).rotate(aroundPlus);

            // Create a polygon to represent that cell, but don't add it to the canvas
            const cell = new Rune.Polygon(0, 0)
                .lineTo(pos1.x, pos1.y)
                .lineTo(pos2.x, pos2.y)
                .lineTo(pos3.x, pos3.y)
                .lineTo(pos4.x, pos4.y);

            // Get the centroid of the polygon
            const midCen = cell.centroid();

            // Get the midpoints of each corner combination
            const mid12 = vecMid(pos1, pos2);
            const mid23 = vecMid(pos2, pos3);
            const mid34 = vecMid(pos3, pos4);
            const mid41 = vecMid(pos4, pos1);

            // Generate a random number from 1-9
            const rnd = Math.ceil(Math.random() * 9);

            // Draw different combinations of line depending on rnd
            switch (rnd) {

                case 1:
                    r.path(0, 0, grp).fill("none").strokeWidth(stkWid)
                        .moveTo(mid12.x, mid12.y)
                        .curveTo(midCen.x, midCen.y, mid34.x, mid34.y);

                    break;

                case 2:
                    r.path(0, 0, grp).fill("none").strokeWidth(stkWid)
                        .moveTo(mid41.x, mid41.y)
                        .curveTo(midCen.x, midCen.y, mid23.x, mid23.y);

                    break;

                case 3:
                    r.path(0, 0, grp).fill("none").strokeWidth(stkWid)
                        .moveTo(mid41.x, mid41.y)
                        .curveTo(midCen.x, midCen.y, mid34.x, mid34.y);

                    break;

                case 4:
                    r.path(0, 0, grp).fill("none").strokeWidth(stkWid)
                        .moveTo(mid41.x, mid41.y)
                        .curveTo(midCen.x, midCen.y, mid12.x, mid12.y);

                    break;

                case 5:
                    r.path(0, 0, grp).fill("none").strokeWidth(stkWid)
                        .moveTo(mid23.x, mid23.y)
                        .curveTo(midCen.x, midCen.y, mid34.x, mid34.y);

                    break;

                case 6:
                    r.path(0, 0, grp).fill("none").strokeWidth(stkWid)
                        .moveTo(mid23.x, mid23.y)
                        .curveTo(midCen.x, midCen.y, mid12.x, mid12.y);

                    break;

                case 7:
                    r.path(0, 0, grp).fill("none").strokeWidth(stkWid)
                        .moveTo(mid12.x, mid12.y)
                        .curveTo(midCen.x, midCen.y, mid34.x, mid34.y);

                    r.path(0, 0, grp).fill("none").strokeWidth(stkWid)
                        .moveTo(mid41.x, mid41.y)
                        .curveTo(midCen.x, midCen.y, mid23.x, mid23.y);

                    break;

                case 8:
                    r.path(0, 0, grp).fill("none").strokeWidth(stkWid)
                        .moveTo(mid34.x, mid34.y)
                        .curveTo(midCen.x, midCen.y, mid41.x, mid41.y);

                    r.path(0, 0, grp).fill("none").strokeWidth(stkWid)
                        .moveTo(mid12.x, mid12.y)
                        .curveTo(midCen.x, midCen.y, mid23.x, mid23.y);

                    break;


                case 9:
                    r.path(0, 0, grp).fill("none").strokeWidth(stkWid)
                        .moveTo(mid12.x, mid12.y)
                        .curveTo(midCen.x, midCen.y, mid41.x, mid41.y);

                    r.path(0, 0, grp).fill("none").strokeWidth(stkWid)
                        .moveTo(mid34.x, mid34.y)
                        .curveTo(midCen.x, midCen.y, mid23.x, mid23.y);

                    break;
            }
        }
    }

    // Function to find the scalar distance between two vectors
    function vecDist(v1, v2) {
        return Math.sqrt((v1.x - v2.x)**2 + (v1.y - v2.y)**2);
    }

    // Function to find the midpoint of two vectors
    function vecMid(v1, v2) {
        return new Rune.Vector((v1.x + v2.x) / 2, (v1.y + v2.y) / 2);
    }

}

// Draw it 
graphic();
r.draw();