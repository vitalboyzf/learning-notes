const fs = require("fs");
const path = require("path");
const filename = path.resolve(__dirname, "./text.txt");
const rs = fs.createReadStream(filename, {
    encoding: "utf8",
    autoClose: true,
    highWaterMark: 6
});
rs.on("open", () => {
    console.log("打开了文件");
});
rs.on("data", (chunk) => {
    console.log("读取", chunk);
    setTimeout(() => {
        rs.pause();
    });
    setTimeout(() => {
        rs.resume();
    }, 1000);
});
rs.on("pause", () => {
    console.log("暂停读取");
});
rs.on("resume", () => {
    console.log("恢复读取");
});
rs.on("end", () => {
    console.log("读取完成");
});
rs.on("close", () => {
    console.log("关闭流");
});
