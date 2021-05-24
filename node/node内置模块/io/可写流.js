const fs = require("fs");
const path = require("path");
// const content = path.resolve(__dirname, "test/synthronized.PNG");
const pathname = path.resolve(__dirname, "test/stream.txt");

const writeStream = fs.createWriteStream(pathname, {
    autoClose: true,
    highWaterMark: 3// 每次读取字节数
});

writeStream.on("open", () => {
    console.log("打开文件");
});


function write() {
    let i = 0;
    return function () {
        let flag = true;
        for (i; i < 1024 && flag; i++) {
            flag = writeStream.write("3a");
        }
        if (i >= 1024) {
            writeStream.close();
        }
    };
}

const start = write();
start();
writeStream.on("drain", () => {
    start();
});

writeStream.on("close", () => {
    console.log("写入完成");
});