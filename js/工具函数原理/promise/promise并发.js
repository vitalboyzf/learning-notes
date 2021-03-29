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
    () => delay(1000),
    () => delay(1302),
    () => delay(1092),
    () => delay(1024)
];
// 创建请求池
function createRequestPool(tasks, pool = 5) {
    // 创建并发请求数组
    let togetherPool = new Array(pool).fill(0);
    // 记录索引
    let index = 0;
    // 结果数组
    let result = [];
    // 返回两个promise
    togetherPool = togetherPool.map(() => {
        return new Promise(function (resolve, reject) {
            const run = function () {
                // 如果没有请求了，执行resolve
                if (index >= tasks.length) {
                    resolve();
                    return;
                }
                let old_index = index;
                const task = tasks[index++];
                task().then(function (res) {
                    // 将任务结果放入result并运行下一个任务
                    result[old_index] = res;
                    run();
                }).catch(function (err) {
                    reject(err);
                });
            };
            run();
        });
    });
    return Promise.all(togetherPool).then(() => result);
}
let res = createRequestPool(tasks, 2).then(res => {
    console.log(res);
}).catch(err => {
    console.log(err);
});