const url = require("url");
const result = url.parse("https://baidu.com:80?query=a&name=3#345");
console.log(result);
const urlObj = {
    protocol: "https:",
    slashes: true,
    auth: null,
    host: "baidu.com:80",
    port: "80",
    hostname: "baidu.com",
    hash: "#345",
    search: "?query=a&name=3",
    query: "query=a&name=3",
    pathname: "/",
    path: "/?query=a&name=3",
    href: "https://baidu.com:80/?query=a&name=3#345"
};
console.log(url.format(urlObj));
const result1 = new url.URL("https://baidu.com:80?query=a&name=3#345");
console.log(result1);
console.log(new url.URLSearchParams("?name=zf&age=2"));// URLSearchParams { 'name' => 'zf', 'age' => '2' }