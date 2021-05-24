const fs = require("fs");
const path = require("path");
const filepath = path.resolve(__dirname, "./text.txt");
// 回调读取
fs.readFile(filepath, { encoding: "utf8", flag: "r" }, (err, data) => {
    console.log("回调读取\n", data);
});
// 同步读取
const content = fs.readFileSync(filepath, "utf8");
console.log("同步读取\n", content);
// 异步读取
async function readPromise() {
    const content = await fs.promises.readFile(filepath, { encoding: "utf8" });
    console.log("promise读取\n", content);
}
readPromise();