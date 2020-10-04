const r = new Rune({
    container: "body",
    width: 794,
    height: 562,
    debug: true
});

function graphic() {

    const margin = 0;
    const offset = 100;
    const w = r.width - (margin * 2)
    const h = r.height - (margin * 2)

    const max = 25;
    const detail = 200;
    const lines = 10;

    const paths = [];
    const pGrp = r.group(0,0)

    for (let j = 1; j < lines; j++) {
        let y = j * h / lines;
        const path = r.path(margin, y,pGrp).fill("none")


        for (let i = 1; i <= w; i++) {
            const x = i * r.width / detail;
            y = -max + (max * 2 * randomGaussian())
            path.lineTo(x, y);
        }

        paths.push(path)
    }

    const chosen = Math.floor(Math.random() * paths.length);
    paths[chosen].strokeWidth(5);

    const y = (chosen + 1) * h / lines
    const x = offset + Math.random() * (w - (2 * offset))

    const beams = r.group(x, y)
    for (let rad = offset * 0.3; rad <= w*2; rad += offset * 0.3)
        r.ellipse(0, 0, rad, rad, beams).fill("none").stroke(0,0.3);
}

// Draw it 
graphic();
r.draw();