function refreshMe() {

    while (r.stage.children.length > 0) {
        for (let i = 0; i < r.stage.children.length; i++) {
            r.stage.remove(r.stage.children[i])
        }
    }

    graphic();
    r.draw();
}

function downloadMe() {
    download(document.querySelector("svg").outerHTML, "sketch.svg", "image/svg+xml")
}

function toPixels (num) {
	return num * 3.7795;
}

function randomGaussian() {
    const num = Math.sqrt(-2.0 * Math.log(Math.random())) * Math.cos(2.0 * Math.PI * Math.random()) / 10 + 0.5;
    if (num > 1 || num < 0) return randomGaussian(); // resample between 0 and 1
    return num;
}