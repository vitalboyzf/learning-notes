const net = require("net");
const socket = net.createConnection({
    host: "49.232.250.47",
    port: 80
}, () => console.log("连接成功"));
socket.on("data", (chunk) => {
    console.log(chunk.toString());
});
socket.write(`GET / HTTP/1.1
Host: duyi.key.qq.com
Connection: keep-alive
 

`);
socket.on("close",()=>{
    console.log("连接断开");
});