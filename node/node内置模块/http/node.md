# http
- 启动web服务器的两种方法
```js
const server1 = http.createServer((req, res) => {
  res.end("Server1");
});
const server2 = new http.Server((req, res) => {
  res.end("Server2");
});
```
### 启动一个最简单的web服务器
```js
const http = require("http");
const server = http.createServer((req, res) => {
     // 设置状态码
    // 方式一: 直接给属性赋值
    // res.statusCode = 400;
    // 方式二: 和Head一起设置
    res.writeHead(503, {
        "Content-Type": "text/plain;charset=utf-8",
    });
  res.end("Hello Server");
});

// 启动服务器,并且制定端口号和主机
server.listen(8888, "0.0.0.0", () => {
  console.log("服务器启动成功~");
```
### req请求参数对象: http.IncomingMessage 
- url:请求路径
- method:请求方法
- headers:请求头对象
### node发送请求
```js
var request = http.get({
        host: "localhost",
        path: "/user?name=Tom&age=18&city=beijing",
        port: 3000
    },
    function (res) {
        res.setEncoding("utf-8");
        res.on("data", function (data) {
            console.log("服务端相应name值为：" + data);
        });
    }
);
```
### 登录模拟
```js
const http = require("http");
const {
    URL
} = require("url");
const qs = require("querystring");

// 创建一个web服务器
const server = http.createServer((req, res) => {
    res.setHeader("Content-Type", "text/plain;charset=utf8");
    // 最基本的使用方式
    if (req.url.startsWith("/login")) {

        const {
            pathname,
            searchParams
        } = new URL(req.url, "http://localhost:3000");
        if (pathname === "/login") {
            const password = searchParams.get("password");
            const username = searchParams.get("username");
            if (+password === 123) {
                res.end("欢迎回来~" + username);

            } else {
                res.write("你错了吧");
                res.end("over!");
            }
        }
    } else if (req.url === "/users") {
        res.end("用户列表~");
    } else {
        res.end("错误请求, 检查~");
    }
});

// 启动服务器,并且制定端口号和主机
server.listen(3000, "0.0.0.0", () => {
    console.log("服务器启动成功~");
});
```
### 解析post请求体
```js
const http = require("http");

// 创建一个web服务器
const server = http.createServer((req, res) => {
    let str = "";
    req.on("data", (data) => {
        str += data.toString();
    });
    req.on("end", () => {
        console.log(str);
    });
    res.end("Hello Server");
});
// 启动服务器,并且制定端口号和主机
server.listen(3000, "0.0.0.0", () => {
    console.log("服务器启动成功~");
});
```