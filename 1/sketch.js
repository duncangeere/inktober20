const r = new Rune({
    container: "body",
    width: 794,
    height: 561,
    debug: true
});

function graphic() {

    const margin = 48;
    const w = r.width - (margin * 2);
    const h = r.height - (margin * 2);
    const grp = r.group(margin, margin);

    const rows = 10;
    const cols = 15;
    const gutter = 8;

    const rHeight = h / rows;
    const cWidth = w / cols;

    fishSize = 20;
    tailSize = fishSize / 2;
    fishes = [];

    // Background rect for visibility
    //r.rect(0, 0, r.width, r.height).fill(50, 0.1).stroke("none")

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {

            // calculate rough grid position
            const stagger = (row % 2 != 0) ? cWidth / 4 : -cWidth / 4
            const x1 = col * cWidth + gutter / 2 + stagger;
            const y1 = row * rHeight + gutter / 2;

            // calculate fish start position
            x2 = x1 + (cWidth - gutter - fishSize) / 2
            y2 = y1 + (rHeight - gutter - fishSize) / 2

            const fish = r.group(x2, y2, grp)

            //Fish body
            r.rect(0, 0, fishSize, fishSize, fish)
                .rotate(45, fishSize / 2, fishSize / 2)
                .fill("none")

            // Fish eye
            const eyeAdjust = (row % 2 != 0) ? 3 : 1
            const eye = r.ellipse(eyeAdjust * tailSize/2, tailSize*0.8, 4, 4, fish)

            // Fish tail
            x3 = tailSize / 2 - ((row % 2 != 0) ? 1.5 * tailSize : -1.5 * tailSize); // + (row % 2 != 0) ? tailSize : -tailSize
            y3 = tailSize / 2;

            const tail = r.rect(x3, y3, tailSize, tailSize, fish).fill("none")
            tail.rotate(45, x3 + tailSize / 2, y3 + tailSize / 2)

            // Push whole fish to array
            fishes.push(fish)
        }
    }

    for (let child of fishes[Math.floor(Math.random() * fishes.length)].children) {
        child.fill("orange");
    }

}

// Draw it 
graphic();
r.draw();