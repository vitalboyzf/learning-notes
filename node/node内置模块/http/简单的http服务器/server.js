const http = require("http");
const url = require("url");
const path = require("path");
const fs = require("fs");

async function getStat(filename) {
    try {
        return await fs.promises.stat(filename);
    } catch (e) {
        return null;
    }
}

async function getInfo(urlObj) {
    let parsePath = url.parse(urlObj);
    let publicUrl = path.resolve(__dirname, "public", parsePath.pathname.substr(1));
    let stat = await getStat(publicUrl);
    if (!stat) {
        // 没有文件
        return await fs.promises.readFile(path.resolve(__dirname, "./public/default.html"));
    } else if (stat.isDirectory()) {
        // 是文件夹
        publicUrl = path.resolve(__dirname, "public", parsePath.pathname.substr(1), "index.html");
        // 如果是文件夹，在路径后面拼接上index.html
        stat = await getStat(publicUrl);
        // 再调用getStat方法看看有没有这个文件
        if (!stat) {
            // 如果没有这个文件，返回404页面
            return await fs.promises.readFile(path.resolve(__dirname, "./public/default.html"));
        } else {
            // 如果有这个拼接index.html的文件，返回这个文件的buffer
            return await fs.promises.readFile(publicUrl);
        }
    } else {
        // 正常文件
        return await fs.promises.readFile(publicUrl);
    }
}


const server = http.createServer(async (req, res) => {
    const staticPath = await getInfo(req.url);
    res.write(staticPath);
    res.end();
}).listen(8080);
server.on("listening", _ => {
    console.log("服务开启，监听端口 8080");
});