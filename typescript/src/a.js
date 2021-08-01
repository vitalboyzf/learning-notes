const bu = Buffer.from([3, 4]);
// const b2 = Buffer.from("nb");
// console.log(Buffer.concat([bu, b2], 7).toString());
// Buffer.copy = function (target, targetStart, sourceStart = 0, sourceEnd = this.length) {
//     for (let i = sourceStart; i < sourceEnd; i++) {
//         target[targetStart++] = this[i];
//     }
// };
// Buffer.concat = function (bufferList, len) {
//     if (!len) {
//         len = bufferList.reduce((pre, cur) => pre + cur.length, 0);
//     }
//     const bigBuffer = Buffer.alloc(len);
//     let offset = 0;
//     for (let i = 0; i < bufferList.length; i++) {
//         const buffer = bufferList[i];
//         if (Buffer.isBuffer(buffer)) {
//             buffer.copy(bigBuffer, offset);
//             offset += buffer.length;
//         }
//     }
//     return bigBuffer;
// };
// console.log(Buffer.concat([bu, b2]).toString());
console.log(Buffer.prototype.toString("utf-8"));