// Ocean, Conifers, Grassland, Mountain
elements = [{
        "word": "ocean",
        "countrycode": "BR",
        "timestamp": "2017-03-24 20:26:29.04747 UTC",
        "recognized": true,
        "key_id": "5759367188054016",
        "drawing": [
            [
                [14, 33, 58, 98, 124, 152, 175, 210, 230],
                [216, 213, 214, 220, 213, 210, 211, 221, 221]
            ]
        ]
    }, {
        "word": "grass",
        "countrycode": "NZ",
        "timestamp": "2017-03-27 08:32:04.81784 UTC",
        "recognized": true,
        "key_id": "5032868034117632",
        "drawing": [
            [
                [21, 30, 56],
                [60, 82, 177]
            ],
            [
                [91, 108, 108, 104],
                [82, 156, 181, 177]
            ],
            [
                [138, 160, 164, 164, 160],
                [65, 125, 156, 168, 156]
            ],
            [
                [233, 233, 229, 229],
                [74, 117, 130, 156]
            ]
        ]
    },
    {
        "word": "tree",
        "countrycode": "US",
        "timestamp": "2017-03-08 16:54:01.37875 UTC",
        "recognized": true,
        "key_id": "6718527320883200",
        "drawing": [
            [
                [89, 104, 103, 100, 91],
                [115, 195, 237, 245, 249]
            ],
            [
                [136, 136, 139, 147, 167],
                [116, 191, 216, 234, 255]
            ],
            [
                [86, 31, 2, 0, 11, 38, 59, 72, 84, 80, 89, 108, 125, 132, 137, 169, 195, 207, 203, 186, 196, 209, 211, 207, 178, 146],
                [114, 112, 92, 75, 59, 33, 21, 20, 38, 24, 13, 1, 0, 11, 29, 26, 43, 59, 67, 74, 83, 103, 109, 116, 126, 126]
            ]
        ]
    },
    {
        "word": "mountain",
        "countrycode": "US",
        "timestamp": "2017-03-11 22:44:24.65146 UTC",
        "recognized": true,
        "key_id": "5758994649972736",
        "drawing": [
            [
                [0, 38, 46, 50, 57, 72, 77, 82, 91, 94, 102, 107, 116, 127, 132, 139, 151, 153, 154, 164, 181, 191, 204, 208, 218, 225, 230, 255],
                [245, 129, 114, 110, 114, 141, 82, 69, 68, 60, 2, 0, 8, 4, 6, 30, 103, 150, 123, 133, 170, 207, 229, 228, 212, 211, 212, 238]
            ]
        ]
    }
];

// Function to draw a settlement inside a circle
function drawSettlement(c, all) {
    const x = c.state.x;
    const y = c.state.y;
    const radius = c.state.radius;

    //This group holds all the things in the settlement
    const grp = r.group(x, y, all);

    //Create different possible settlement layouts
    //To draw in the center, set x, y positions to half of width * -1 and half of height * -1
    function possA() {

        //Middle rectangle
        r.rect(-1 * radius * 0.6, -1 * radius * 0.2, radius * 1.2, radius * 0.4, grp).fill("none").rotate(0);

        //4 small squares to the left
        r.rect(-1 * radius * 0.6, -1 * radius * 0.6, radius * 0.1, radius * 0.1, grp).fill("none").rotate(0);
        r.rect(-1 * radius * 0.45, -1 * radius * 0.6, radius * 0.1, radius * 0.1, grp).fill("none").rotate(0);
        r.rect(-1 * radius * 0.6, -1 * radius * 0.45, radius * 0.1, radius * 0.1, grp).fill("none").rotate(0);
        r.rect(-1 * radius * 0.45, -1 * radius * 0.45, radius * 0.1, radius * 0.1, grp).fill("none").rotate(0);

        //4 small squares to the right
        r.rect(radius * 0.5, -1 * radius * 0.6, radius * 0.1, radius * 0.1, grp).fill("none").rotate(0);
        r.rect(radius * 0.35, -1 * radius * 0.6, radius * 0.1, radius * 0.1, grp).fill("none").rotate(0);
        r.rect(radius * 0.5, -1 * radius * 0.45, radius * 0.1, radius * 0.1, grp).fill("none").rotate(0);
        r.rect(radius * 0.35, -1 * radius * 0.45, radius * 0.1, radius * 0.1, grp).fill("none").rotate(0);

        //Small circle top middle
        r.circle(0, -1 * radius * 0.6, radius * 0.25, grp).fill("none");

        //Church in bottom left
        r.rect(-1 * radius * 0.6, radius * 0.35, radius * 0.3, radius * 0.3, grp).fill("none").rotate(0);
        r.line(-1 * radius * 0.6, radius * 0.35, (-1 * radius * 0.6) + (radius * 0.3), (radius * 0.35) + (radius * 0.3), grp);
        r.line((-1 * radius * 0.6) + (radius * 0.3), radius * 0.35, -1 * radius * 0.6, (radius * 0.35) + (radius * 0.3), grp);

        //2 small circles in bottom right
        r.circle(radius * 0.55, radius * 0.5, radius * 0.13, grp).fill("none");
        r.circle(radius * 0.2, radius * 0.7, radius * 0.13, grp).fill("none");
    }


    function possB() {

        //Church in the middle
        r.rect(-1 * radius * 0.4 / 2, -1 * radius * 0.4 / 2, radius * 0.4, radius * 0.4, grp).fill("none").rotate(0);
        r.line(-1 * radius * 0.4 / 2, -1 * radius * 0.4 / 2, (-1 * radius * 0.4 / 2) + (radius * 0.4), (-1 * radius * 0.4 / 2) + (radius * 0.4), grp);
        r.line((-1 * radius * 0.4 / 2) + radius * 0.4, -1 * radius * 0.4 / 2, -1 * radius * 0.4 / 2, (-1 * radius * 0.4 / 2) + (radius * 0.4), grp);

        r.rect(radius * 0.45, -1 * radius * 0.45, radius * 0.3, radius * 0.9, grp).fill("none").rotate(135, 0, 0);
        r.rect(radius * 0.45, -1 * radius * 0.45, radius * 0.3, radius * 0.9, grp).fill("none").rotate(315, 0, 0);

        // String of circles along the outer edge 
        for (let i = 0; i < 60; i = i + 20) {
            let x = Math.cos(Rune.radians(i)) * radius * 0.8;
            let y = Math.sin(Rune.radians(i)) * radius * 0.8;

            r.circle(x, y, radius * 0.1, grp).fill("none").rotate(370, 0, 0);
        }

        for (let i = 0; i < 60; i = i + 20) {
            let x = Math.cos(Rune.radians(i)) * radius * 0.8;
            let y = Math.sin(Rune.radians(i)) * radius * 0.8;

            r.circle(x, y, radius * 0.1, grp).fill("none").rotate(190, 0, 0);
        }
    }

    function possC() {

        //3 rectangle: middle, left, bottom
        r.rect(radius * 0.6, -1 * radius * 0.45, radius * 0.2, radius * 0.9, grp).fill("none").rotate(270, 0, 0);
        r.rect(radius * 0.6, -1 * radius * 0.45, radius * 0.2, radius * 0.9, grp).fill("none").rotate(180, 0, 0);
        r.rect(radius * 0.6, -1 * radius * 0.45, radius * 0.2, radius * 0.9, grp).fill("none").rotate(90, 0, 0);

        //Circles with circles inside, right
        for (let i = 0; i < 90; i = i + 30) {
            let x = Math.cos(Rune.radians(i)) * radius * 0.75;
            let y = Math.sin(Rune.radians(i)) * radius * 0.75;

            r.circle(x, y, radius * 0.15, grp).fill("none").rotate(330, 0, 0);
            r.circle(x, y, radius * 0.07, grp).fill("none").rotate(330, 0, 0);
        }

        //4 squares in the middle
        //Upper left church
        r.rect(-1 * radius * 0.2 / 2 - (radius * 0.25), -1 * radius * 0.2 / 2, radius * 0.2, radius * 0.2, grp).fill("none").rotate(45, 0, 0);
        r.line(-1 * radius * 0.2 / 2 - (radius * 0.25), -1 * radius * 0.2 / 2, (-1 * radius * 0.2 / 2) + (radius * 0.2) - (radius * 0.25), (-1 * radius * 0.2 / 2) + (radius * 0.2), grp).rotate(45, 0, 0);
        r.line((-1 * radius * 0.2 / 2) + (radius * 0.2) - (radius * 0.25), -1 * radius * 0.2 / 2, -1 * (radius * 0.2 / 2) - (radius * 0.25), (-1 * radius * 0.2 / 2) + (radius * 0.2), grp).rotate(45, 0, 0);

        //Lower right church
        r.rect(-1 * radius * 0.2 / 2 - (radius * 0.25), -1 * radius * 0.2 / 2, radius * 0.2, radius * 0.2, grp).fill("none").rotate(225, 0, 0);
        r.line(-1 * radius * 0.2 / 2 - (radius * 0.25), -1 * radius * 0.2 / 2, (-1 * radius * 0.2 / 2) + (radius * 0.2) - (radius * 0.25), (-1 * radius * 0.2 / 2) + (radius * 0.2), grp).rotate(225, 0, 0);
        r.line((-1 * radius * 0.2 / 2) + (radius * 0.2) - (radius * 0.25), -1 * radius * 0.2 / 2, -1 * (radius * 0.2 / 2) - (radius * 0.25), (-1 * radius * 0.2 / 2) + (radius * 0.2), grp).rotate(225, 0, 0);

        //Upper right group of 4 squares
        r.rect(-1 * radius * 0.2 / 2 - (radius * 0.25), -1 * radius * 0.2 / 2, radius * 0.08, radius * 0.08, grp).fill("none").rotate(135, 0, 0);
        r.rect(-1 * radius * 0.2 / 2 - (radius * 0.35), -1 * radius * 0.2 / 2, radius * 0.08, radius * 0.08, grp).fill("none").rotate(135, 0, 0);
        r.rect(-1 * radius * 0.2 / 2 - (radius * 0.25), -1 * (radius * 0.2 / 2) + (radius * 0.1), radius * 0.08, radius * 0.08, grp).fill("none").rotate(135, 0, 0);
        r.rect(-1 * radius * 0.2 / 2 - (radius * 0.35), -1 * (radius * 0.2 / 2) + (radius * 0.1), radius * 0.08, radius * 0.08, grp).fill("none").rotate(135, 0, 0);

        //Lower left group of 4 squares
        r.rect(-1 * radius * 0.2 / 2 - (radius * 0.25), -1 * radius * 0.2 / 2, radius * 0.08, radius * 0.08, grp).fill("none").rotate(315, 0, 0);
        r.rect(-1 * radius * 0.2 / 2 - (radius * 0.35), -1 * radius * 0.2 / 2, radius * 0.08, radius * 0.08, grp).fill("none").rotate(315, 0, 0);
        r.rect(-1 * radius * 0.2 / 2 - (radius * 0.25), -1 * (radius * 0.2 / 2) + (radius * 0.1), radius * 0.08, radius * 0.08, grp).fill("none").rotate(315, 0, 0);
        r.rect(-1 * radius * 0.2 / 2 - (radius * 0.35), -1 * (radius * 0.2 / 2) + (radius * 0.1), radius * 0.08, radius * 0.08, grp).fill("none").rotate(315, 0, 0);

    }

    function possD() {
        //Circles with circles inside, right
        for (let i = 0; i < 60; i = i + 30) {
            let x = Math.cos(Rune.radians(i)) * radius * 0.75;
            let y = Math.sin(Rune.radians(i)) * radius * 0.75;

            r.circle(x, y, radius * 0.15, grp).fill("none").rotate(270, 0, 0);
            r.circle(x, y, radius * 0.07, grp).fill("none").rotate(270, 0, 0);
        }

        //2 squares distributed along side
        r.rect(radius * 0.5, (-1 * radius * 0.4) + (radius * 0.05), radius * 0.3, radius * 0.3, grp).fill("none").rotate(0);
        r.rect(radius * 0.5, (-1 * radius * 0.4) + (radius * 0.3) + (radius * 0.2), radius * 0.3, radius * 0.3, grp).fill("none").rotate(0);

        //6 silos near the bottom
        r.circle(radius * 0.5 - (radius * 0.5), -1 * radius * 0.6 - (radius * 0.1), radius * 0.06, grp).fill("none").rotate(180, 0, 0);
        r.circle(radius * 0.35 - (radius * 0.5), -1 * radius * 0.6 - (radius * 0.1), radius * 0.06, grp).fill("none").rotate(180, 0, 0);
        r.circle(radius * 0.5 - (radius * 0.5), -1 * radius * 0.45 - (radius * 0.1), radius * 0.06, grp).fill("none").rotate(180, 0, 0);
        r.circle(radius * 0.35 - (radius * 0.5), -1 * radius * 0.45 - (radius * 0.1), radius * 0.06, grp).fill("none").rotate(180, 0, 0);
        r.circle(radius * 0.65 - (radius * 0.5), -1 * radius * 0.45 - (radius * 0.1), radius * 0.06, grp).fill("none").rotate(180, 0, 0);
        r.circle(radius * 0.65 - (radius * 0.5), -1 * radius * 0.6 - (radius * 0.1), radius * 0.06, grp).fill("none").rotate(180, 0, 0);

        //Cross shaped rectangles with circle in the middle
        r.circle(1 - radius * 0.4, 0, radius * 0.1, grp).fill("none");
        r.rect(1 - radius * 0.4 - (radius * 0.05), (radius * 0.15), radius * 0.1, radius * 0.3, grp).fill("none").rotate(90, 1 - radius * 0.4, 0);
        r.rect(1 - radius * 0.4 - (radius * 0.05), (radius * 0.15), radius * 0.1, radius * 0.3, grp).fill("none").rotate(0, 1 - radius * 0.4, 0);
        r.rect(1 - radius * 0.4 - (radius * 0.05), (radius * 0.15), radius * 0.1, radius * 0.3, grp).fill("none").rotate(180, 1 - radius * 0.4, 0);
        r.rect(1 - radius * 0.4 - (radius * 0.05), (radius * 0.15), radius * 0.1, radius * 0.3, grp).fill("none").rotate(270, 1 - radius * 0.4, 0);

    }

    function possE() {

        //2 squares on the top
        const sqSize = radius * 0.25;
        const gutter = radius * 0.2;

        const x1 = -1 * (2 * sqSize + 1.5 * gutter);
        const x2 = -1 * (sqSize + 0.5 * gutter);
        const x3 = 0.5 * gutter;
        const x4 = sqSize + 1.5 * gutter;

        const y1 = -1 * (2 * sqSize + 1.5 * gutter);
        const y2 = -1 * (sqSize + 0.5 * gutter);
        const y3 = 0.5 * gutter;
        const y4 = sqSize + 1.5 * gutter;

        r.rect(x1, y2, sqSize, sqSize, grp).fill("none");
        r.rect(x2, y2, sqSize, sqSize, grp).fill("none").rotate(45, x2 + sqSize / 2, y2 + sqSize / 2);
        r.rect(x3, y2, sqSize, sqSize, grp).fill("none").rotate(45, x3 + sqSize / 2, y2 + sqSize / 2);
        r.rect(x4, y2, sqSize, sqSize, grp).fill("none");

        r.rect(x1, y3, sqSize, sqSize, grp).fill("none");
        r.rect(x2, y3, sqSize, sqSize, grp).fill("none").rotate(45, x2 + sqSize / 2, y3 + sqSize / 2);
        r.rect(x3, y3, sqSize, sqSize, grp).fill("none").rotate(45, x3 + sqSize / 2, y3 + sqSize / 2);
        r.rect(x4, y3, sqSize, sqSize, grp).fill("none");

        r.rect(x2, y1, sqSize, sqSize, grp).fill("none");
        r.rect(x3, y1, sqSize, sqSize, grp).fill("none");
        r.rect(x2, y4, sqSize, sqSize, grp).fill("none");
        r.rect(x3, y4, sqSize, sqSize, grp).fill("none");
    }

    const chooser = Math.random();
    if (chooser > 0.75) {
        possA();
    } else if (chooser > 0.5) {
        possB();
    } else if (chooser > 0.25) {
        possC();
    } else {
        possD();
    };

    //Rotate the settlement a random amount
    grp.rotate(Rune.random(0, 360), x, y);
    return grp;
}