const fs = require("fs");
const path = require("path");
const filename = path.resolve(__dirname,"test/index.txt");
const readStream = fs.createReadStream(filename,{
    encoding:"utf8",
    highWaterMark:64 * 1024,
    autoClose:true
});
readStream.on("open",()=>{
    console.log("文件打开了");
});
readStream.on("error",()=>{
    console.log("读取文件出错了");
});
readStream.on("data",(chunk)=>{
    console.log(chunk);
});
readStream.on("end",()=>{
    console.log("文件全部读取完成");
});
readStream.on("close",()=>{
    console.log("读取完成关闭流");
});

