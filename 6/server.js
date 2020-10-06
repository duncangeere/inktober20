// Use node server.js to start the server
// Get more data from https://console.cloud.google.com/storage/browser/quickdraw_dataset/full/simplified;tab=objects?pli=1&prefix=

const fs = require("fs")
const ndjson = require("ndjson")

let mice = [];

fs.createReadStream('mouse.ndjson')
    .pipe(ndjson.parse())
    .on("data", function(obj) {
        mice.push(obj);
    })

books = mice.filter(mouse => mouse.recognized)


const express = require('express');
const app = express();
const port = 3000;

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});


app.get('/mouse', (request, result) => {
	console.log(`Delivered one of ${mice.length} sketches!`)
    const index = Math.floor(Math.random() * mice.length)
    result.send(mice[index]);
});

app.use(express.static("public"))