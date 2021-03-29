function compose(middleware) {
    return function () {
        return dispatch(0);

        function dispatch(i) {
            // 取出将要执行的函数
            let fn = middleware[i];
            // 如果fn为空 直接返回已决状态
            if (!fn) return Promise.resolve();
            // 将下一个函数作为参数next传给当前函数
            return Promise.resolve(fn(function next() {
                return dispatch(i + 1);
            }));
        }
    };
}
async function one(next) {
    console.log("one start");
    const twoReturn = await next();
    console.log("one 接受到的 two返回值:", twoReturn);
}
async function two(next) {
    console.log("two start");
    await next();
    console.log("two end");
    return "two返回值";
}

function three() {
    console.log("three");
}
// 传入中间件函数组成的数组队列，合并成一个中间件函数
const mid = compose([one, two, three]);
mid();