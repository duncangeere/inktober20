const r = new Rune({
    container: "body",
    width: 794,
    height: 561,
    debug: true
});

function graphic() {

    const margin = 24;
    const w = r.width - (margin * 2);
    const h = r.height - (margin * 2);
    const grp1 = r.group(margin, margin);
    const grp2 = r.group(margin, margin);

    const rows = 15;
    const cols = 45;
    const gutter = 8;

    const rHeight = h / rows;
    const cWidth = w / cols;

    const colour = new Rune.Color('hsv', 200, 100, 100, 0.5);
    const yDisp = 50;

    // Background rect for visibility
    //r.rect(0, 0, r.width, r.height).fill(50, 0.1).stroke("none")

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const x = col * cWidth + gutter / 2;
            const y = row * rHeight + gutter / 2;
            const rnd = Math.random()
            const diff = rnd > 0.9;
            //r.rect(x, y, cWidth - gutter, rHeight - gutter, diff ? grp2 : grp1)
            if (y + rnd * yDisp < r.height - rHeight) {
                r.rect(x, diff ? y + rnd * yDisp : y, cWidth - gutter, rHeight - gutter, diff ? grp2 : grp1)
                    .fill(diff ? colour : "none")
                    .stroke(diff ? colour : 0)
                    .rotate(diff ? Math.random() * 45 : 0, x + (cWidth - gutter) / 2, y + rnd * yDisp + (rHeight - gutter) / 2)
            }
        }
    }
}

// Draw it 
graphic();
r.draw();