const fs = require("fs");
const path = require("path");
(async function () {
    const origin = path.resolve(__dirname, "./test/1.jpg");
    const target = path.resolve(__dirname, "./test/2.jpg");
    const readStream = fs.createReadStream(origin);
    const writeStream = fs.createWriteStream(target);
    const newStream = readStream.pipe(writeStream);
    console.log(newStream);
}());