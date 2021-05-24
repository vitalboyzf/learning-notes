const http = require("http");
const fs = require("fs");
const qs = require("querystring");
const path = require("path");
const url = require("url");


const server = http.createServer(async (req, res) => {
    if (req.url === "/upload") {
        if (req.method === "POST") {
            req.setEncoding("binary");

            let body = "";
            // multipart/form-data; boundary=--------------------------007600122673495482407018
            const totalBoundary = req.headers["content-type"].split(";")[1];
            // --------------------------007600122673495482407018
            const boundary = totalBoundary.split("=")[1];
            req.on("data", (data) => {
                body += data;
            });
            req.on("end", () => {
                // 处理body
                // 1.获取image/png的位置
                const payload = qs.parse(body, "\r\n", ": ");
                const type = payload["Content-Type"]; // 获取image/png
                // 2.开始在image/png的位置进行截取
                const typeIndex = body.indexOf(type);
                const typeLength = type.length;
                // 截取image/png后面的内容
                let imageData = body.substring(typeIndex + typeLength);
                // 3.将开头的空格去掉
                imageData = imageData.replace(/^\s\s*/, "");
                // 4.将最后的boundary去掉
                imageData = imageData.substring(0, imageData.indexOf(`--${boundary}--`));
                // 写入到文件中
                fs.writeFile(path.resolve(__dirname, "./foo.png"), imageData, "binary", (err) => {
                    if (err) console.log(err);
                    res.end("文件上传成功~");
                });
            });
        } else {
            res.statusCode = 200;
            res.end("ok");
        }
    } else {

        const staticPath = await getInfo(req.url);
        res.write(staticPath);
        res.end();
    }
}).listen(3000);
server.on("listening", _ => {
    console.log("服务开启，监听端口 8080");
});

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
        return await fs.promises.readFile(path.resolve(__dirname, "./简单的http服务器/public/default.html"));
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