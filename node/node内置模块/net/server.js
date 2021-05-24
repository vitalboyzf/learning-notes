const net = require("net");
const server = net.createServer();
server.listen(2000, () => {
    console.log("服务启动");
});

server.on("connection", (socket) => {
    console.log("有连接");
    socket.on("data", (chunk) => {
        // console.log(chunk.toString());
        socket.write(`HTTP/1.1 200 ok
          

        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>
        <body>
            <h1>Hello World</h1>
        </body>
        </html>
          `);
        socket.end();
    });
});
server.on("end", (socket) => {
    console.log("连接关闭");
});