const fs = require("fs");
const path = require("path");
const from = path.resolve(__dirname, "./text.txt");
const to = path.resolve(__dirname, "./text1.txt");
const rs = fs.createReadStream(from);
const ws = fs.createWriteStream(to);
rs.on("data", (chunk) => {
    const flag = ws.write(chunk);
    if (!flag) {
        rs.pause();
    }
});
ws.on("drain", () => {
    // 通道空闲,继续写入
    rs.resume();
});
rs.on("end", () => {
    console.log("读取完成end");
});
rs.on("close", () => {
    console.log("关闭流close");
});
