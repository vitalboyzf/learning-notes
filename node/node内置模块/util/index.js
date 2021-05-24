// util
const util = require("util");
// 1.判断两个对象是否严格相等
const obj1 = {
    a: "a"
};
const obj2 = {
    a: "a"
};
console.log(util.isDeepStrictEqual(obj1, obj2));

// 2. 回调函数转化为promise函数
function callback(count, func) {
    setTimeout(() => {
        func(null, count); // 第一个参数reject 第二个参数传resolve
    }, 1000);
}
const delay = util.promisify(callback);
delay(1).then(data => {
    console.log("success", data);
}).catch(err => {
    console.log("error", err);
});