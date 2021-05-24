# path模块
- 注意相对路径，除了require()，其他都是相对于执行node终端的路径，为了避免出错应该用__dirname
- 引入path模块```const path = require("path");```
### 系统环境
```js
console.log(path.delimiter); // ; 获取当前操作系统环境变量的定界符（分隔符）
console.log(process.env.Path.split(path.delimiter));//获取当前系统的环境变量path配置，根据定界符拆分为数组
```
### 文件信息获取
```js
// 判断路径是否为绝对路径，返回Boolean值
console.log(path.isAbsolute("/a/b.js"));
// 获取当前文件路径的文件名
console.log(path.basename("abc/in/e.html",".html")); // e 
// 获取当前系统路径分隔符
console.log(path.sep)// \ 
// 获取目标文件的文件夹路径
console.log(path.dirname("a/b/c.js")); // a/b
// 获取目标文件后缀名
console.log(path.extname("a/b/c.js")); // .js 
// 规范化字符串路径，减少“..”和“.”部分。当发现多个斜杠时，它们将被一个斜杠替换；当路径包含尾部斜杠时，它将被保留
console.log(path.normalize("../a/b.js"));
// path.parse 获取目标文件信息
console.log(path.parse("/a/b.js")); // { root: '/', dir: '/a', base: 'b.js', ext: '.js', name: 'b' }
// path.format 将path.parse返回的对象结构转化回字符串路径
console.log(path.format({ root: '/', dir: '/a', base: 'b.js', ext: '.js', name: 'b' }));// /a/b.js
```
```js
const path = require("path");
console.log(path.parse(path.resolve(__dirname, "a/b.js"))); // 这个函数返回结果为下面的file
const file = {
    root: "C:\\",
    dir: "C:\\Users\\张斐\\Desktop\\知识融合工作组\\学习笔记\\node\\path\\a",
    base: "b.js",
    ext: ".js",
    name: "b"
};
// 将file转化为路径字符串：C:\Users\张斐\Desktop\知识融合工作组\学习笔记\node\path\a\b.js
console.log(path.format(file));
```
### 路径操作
- path.relative 后面的路径相对于前面的路径的路径
```js
path.relative("/a/b/d/c.js", "/a/b/d/f.js"); // ../f.js
```
- path.join 怎么写怎么拼接，当发现多个斜杠时，它们将被一个斜杠替换
```js
console.log(path.join("./first", "/second", "file.js"));  // first/second/file.js 
console.log(path.join("./first", "./second/", "file.js"));// first/second/file.js
console.log(path.join("/first", "/second/", "/file.js")); // /first/second/file.js
```
- path.resolve 如果第一个不是绝对路径，会拼上到当前工作区的绝对路径（`process.pwd()`），./相对于终端执行路径`process.pwd()`,后面的路径要加./
```js
console.log(path.resolve("./a", "./b")); // process.pwd()/a/b
console.log(path.resolve("/a", "./b")); // C:/a/b
console.log(path.resolve("./a", "/b")); // C:/b   后面的路径出现/绝对路径，前面设置的路径就无效了
```
### node提供了win32和posix兼容的api
- 默认情况下，node会根据不同的系统做相关兼容处理，力保输出的结果在不同平台下是一致的，但是某些情况下还是不能完美的兼容所有的情况。
- 所以，node提供了win32和posix各自对应path的所有的api。也就是说：path模块的api都可以通过path.win32 或者 path.posix调用。