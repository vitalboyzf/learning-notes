const fs = require("fs");
const path = require("path");
const filepath = path.resolve(__dirname, "./text2.txt");
fs.writeFile(filepath, "异步回调写入的", { encoding: "utf8", flag: "w" }, (err) => {
    if (err) {
        console.log(err);
    }
    if (!err) {
        console.log("写入成功");
    }
});
//  fs.writeFileSync(filepath, "同步写入的", { encoding: "utf8" });

// async function writeFile() {
//     await fs.promises.writeFile(filepath, 'console.log("hello");');
// }
// writeFile();