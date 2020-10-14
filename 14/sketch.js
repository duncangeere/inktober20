'use strict'

const r = new Rune({
    container: "body",
    width: 794,
    height: 560,
    debug: true
});

function graphic() {

    // Page parameters
    const margin = 50;
    const w = r.width - (margin * 2);
    const h = r.height - (margin * 2);
    const cells = r.group(0, 0);
    const edges = r.group(0, 0)

    // Define the sketch parameters
    const dotCount = 10;
    const dots = [];
    const cellCount = 4;

    // Create the dot cloud
    for (let i = 0; i < dotCount; i++) {
        const dot = new Rune.Vector(Rune.random(margin, w), Rune.random(margin, h))
        dots.push(dot);
    }

    // Define bounding box
    const bbox = { xl: margin, xr: margin + w, yt: margin, yb: margin + h }
    // xl is x-left, xr is x-right, yt is y-top, and yb is y-bottom

    // Create the voronoi object. Thanks to Raymond Hill's voronoi library!
    // https://github.com/gorhill/Javascript-Voronoi
    const voronoi = new Voronoi().compute(dots, bbox);

    // Loop over the edges and draw them
    for (let edge of voronoi.edges) {
        r.line(edge.va.x, edge.va.y, edge.vb.x, edge.vb.y, edges).strokeWidth(3)
    }

    // Loop over the cells and create a polygon
    for (let cell of voronoi.cells) {

        // Create "parent" polygon, but don't put it on the stage
        const poly = new Rune.Polygon(0, 0).fill("none")

        // Loop over the halfedges of the cell
        for (let edge of cell.halfedges) {

            // Figure out where the next vertex is
            const endpoint = edge.getEndpoint();

            //draw a line to the next vertex
            poly.lineTo(endpoint.x, endpoint.y);
        }

        // Get the parent polygon's centroid
        const centroid = poly.centroid();

        // Loop over the number of inner polygons we want to create
        for (let i = 1; i <= cellCount; i++) {

            // Define a new polygon at the parent polygon's centroid
            const innerP = r.polygon(centroid.x, centroid.y, cells).fill("none")

            // loop over the parent polygon's vertices
            for (let vertex of poly.state.vectors) {

                // Figure out position of this vertex relative to the centroid of the parent polygon
                const newvertex = vertex.sub(centroid)

                // Draw a line to there
                innerP.lineTo(newvertex.x, newvertex.y)
            }

            // Scale it down
            innerP.scale(1 - (i / cellCount)).strokeWidth(1);
        }
    }
}

// Draw it 
graphic();
r.draw();