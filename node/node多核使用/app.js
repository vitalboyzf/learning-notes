const http = require("http");
const server = http.createServer((request, response) => {
    if (Math.random() > 0.8) throw new Error("位置错误！！！");
    response.end("hello");
});
if (!module.parent) {
    server.listen(3000);
    console.log("app start at 3000");
} else {
    module.exports = server;
}