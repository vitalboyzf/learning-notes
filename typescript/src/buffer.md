### 基本概念
- 对于前端开发来说，很多人对Buffer是陌生的，因为在浏览器中，并没有Buffer，那么为什么在node端，js需要Buffer呢
- 对于Buffer，官方这样说：
>* JavaScript 语言没有读取或操作二进制数据流的机制。 Buffer 类被引入作为 Node.js API 的一部分，使其可以在 TCP 流或文件系统操作等场景中处理二进制数据流。
- 这句话的意思就是Buffer类被引入到Node.js的API中，让其与二进制数据流的操作和交互成为可能
- 而浏览器一般是不需要和二进制打交道的，服务端需要和文件io打交道，就避免不了对二进制的操作
### node对buffer的操作
核心创建buffer的方法有下面几种
1. Buffer.from()
可以传入一个字符串或者一个数组
出入字符串是最常见的用法，buffer会很久字符串大小自动分配一个内存存储
传入一个数组，数组中每一项都是一个数字，代表每一块空间分配的大小
2. Buffer.alloc(空间大小); 分配一个固定大小的空间，单位字节
3. Buffer.prototype.toString() toString中传入一个编码字符集，默认为utf-8,常用的还有ASCII
4. Buffer.isBuffer(实例) 判断实例对象是否为Buffer对象
### node中buffer的常用方法实现
```js
Buffer.copy = function (target, targetStart, sourceStart = 0, sourceEnd = this.length) {
    for (let i = sourceStart; i < sourceEnd; i++) {
        target[targetStart++] = this[i];
    }
};
Buffer.concat = function (bufferList, len) {
    if (!len) {
        len = bufferList.reduce((pre, cur) => pre + cur.length, 0);
    }
    const bigBuffer = Buffer.alloc(len);
    let offset = 0;
    for (let i = 0; i < bufferList.length; i++) {
        const buffer = bufferList[i];
        if (Buffer.isBuffer(buffer)) {
            buffer.copy(bigBuffer, offset);
            offset += buffer.length;
        }
    }
    return bigBuffer;
};
```