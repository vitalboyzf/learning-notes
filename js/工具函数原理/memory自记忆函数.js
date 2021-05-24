// 传入一个函数，返回一个函数A，A传入相同的参数，不会再重新执行A函数，直接返回上次执行A的返回结果
function memory(func) {
    const cache = {};
    return function next(...args) {
        const key = JSON.stringify(args);
        if (cache[key]) return cache[key];
        return cache[key] = func.apply(func, args);
    };
}

function test() {
    console.log("test1");
    return "t1";
}

const t = memory(test);
console.log(t(5));
const t1 = Promise.resolve();
console.log(t1.);