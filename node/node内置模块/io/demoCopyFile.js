const fs = require("fs");
const path = require("path");
const fromFile = path.resolve(__dirname, "test/1.jpg");
const toFile = path.resolve(__dirname, "test/target.png");

// (async function methods() {
//     const content = await fs.promises.readFile(fromFile);
//     await fs.promises.writeFile(toFile, content);
//     console.log("copy success");
// })();
// (function method2() {
//     const rs = fs.createReadStream(fromFile);
//     const ws = fs.createWriteStream(toFile);
//     rs.on('data', chunk => {
//         const flag = ws.write(chunk);
//         if (!flag) {
//             rs.pause();
//         }
//     })
//     ws.on('drain', () => {
//         rs.resume();
//     })
//     rs.on("close",() => {
//         ws.end();
//         console.log("copy ok");
//     })
//     ws.on("close",() => {
//         console.log("over");
//     })
// })();
(async function method3() {
    const rs = fs.createReadStream(fromFile);
    let ws = fs.createWriteStream(toFile);
    ws = rs.pipe(ws);
    ws.on("close", _ => {
        console.log("ok");
    });
    ws.on("error", err => {
        console.log("err");
    });
}());

