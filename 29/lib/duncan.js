// Function to remove all children from a Rune.js stage
function screenWipe() {
    while (r.stage.children.length > 0) {
        for (let i = 0; i < r.stage.children.length; i++) {
            r.stage.remove(r.stage.children[i])
        }
    }
}

// Function to refresh a sketch
function refreshMe() {
    screenWipe();
    graphic();
    r.draw();
}

// Function to download a single SVG from a page
function downloadMe() {
    download(document.querySelector("svg").outerHTML, "sketch.svg", "image/svg+xml")
}

// Convert mm to pixels
function toPixels(mm) {
    return mm * 3.7795;
}

// Function to generate a random integer between two values
// Inclusive at the lower extent, exclusive at the upper extent
function randInt(numMin, numMax) {
    if (!numMax) {
        numMax = numMin
        numMin = 0;
    }

    return Math.floor(numMin + Math.random() * (numMax - numMin));
}

// Gaussian random numbers
function randomGaussian() {
    const num = Math.sqrt(-2.0 * Math.log(Math.random())) * Math.cos(2.0 * Math.PI * Math.random()) / 10 + 0.5;
    if (num > 1 || num < 0) return randomGaussian(); // resample between 0 and 1
    return num;
}

// Function to find the scalar distance between two vectors
function vecDist(v1, v2) {
    return Math.sqrt((v1.x - v2.x) ** 2 + (v1.y - v2.y) ** 2);
}

// Function to find half the relative distance between two vectors
function vecAvg(v1, v2) {
    return new Rune.Vector((v1.x - v2.x) / 2, (v1.y - v2.y) / 2);
}

// Function to find vector at the midpoint of two vectors
function vecMid(v1, v2) {
    return new Rune.Vector((v1.x + v2.x) / 2, (v1.y + v2.y) / 2);
}