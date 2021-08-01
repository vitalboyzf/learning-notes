const delay = function (interval) {
    return new Promise(function (resolve, reject) {
        if (interval === 1000) {
            reject(new Error(interval));
        }
        setTimeout(function () {
            resolve(interval);
        }, interval);
    });
};

const tasks = [
    () => delay(1002),
    () => delay(1004),
    () => delay(100),
    () => delay(1302),
    () => delay(1092),
    () => delay(1024)
];
// 创建请求池 tasks为任务列表，每个元素是一个函数，函数执行返回promise实例，pool是并发数量
function createRequestPool(tasks, pool = 5) {
    // 创建并发请求数组
    let togetherPool = new Array(pool).fill(0);
    // 记录索引，保持result位置和任务位置对应
    let index = 0;
    // 结果数组
    let result = [];
    // 返回pool个promise并发执行
    togetherPool = togetherPool.map(() => {
        return new Promise(function (resolve, reject) {
            const run = function () {
                // 如果没有请求了，执行resolve
                if (index >= tasks.length) {
                    resolve();
                    return;
                }
                // 保留索引，用于result结果保持相对位置
                let old_index = index;
                // 获取当前索引的task函数
                const task = tasks[index++];
                task().then(function (res) {
                    // 将任务结果放入result并运行下一个任务
                    result[old_index] = res;
                    run();
                }).catch(function (err) {
                    // 发生异常，直接reject
                    reject(err);
                });
            };
            // 直接执行run函数
            run();
        });
    });
    // 得到结果返回
    return Promise.all(togetherPool).then(() => result);
}
// 测试用例
let res = createRequestPool(tasks, 2).then(res => {
    console.log(res);
}).catch(err => {
    console.log(err);
});