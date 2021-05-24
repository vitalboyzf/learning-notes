const { resolve } = require("path");
const util = require("util");
// const obj1 = { name: "zf", like: [2, 3, 4] };
// const obj2 = { name: "zf", like: [2, 3, 4] };
// console.log(util.isDeepStrictEqual(obj1, obj2));
// function delay(duration) {
//     return new Promise(resolve => {
//         setTimeout(() => {
//             resolve();
//         }, duration);
//     });
// }
function delayFunc(a, b, callback) {
    console.log(a, b);
    setTimeout(() => {
        callback(32);
    }, 12);
}
// delayFunc(1000, (e) => console.log(e));
const delay = util.promisify(delayFunc);
delay(3, 9).then(res => console.log(res)).catch(err => console.log(err));