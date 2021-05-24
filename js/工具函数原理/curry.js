// 初始化传参
function curry(func, ...args) {
    const arity = func.length;
    if (args.length >= arity) {
        return func.apply(this, args);
    } else {
        // 参数不够，返回一个函数，将这个新函数的参数和之前的参数进行组合执行
        return (...args1) => {
            const total = [...args, ...args1];
            return curry(func, ...total);
        };
    }
}
// 初始化不传参
function curry1(func) {
    let arity = [];
    return function next(...args) {
        arity = [...arity, ...args];
        if (arity.length >= func.length) {
            func.apply(func, arity);
        } else {
            return next;
        }
    };
}

function test(a, b, c, d) {
    console.log(a, b, c, d, this);
    return a + b;
}
const func1 = curry1(test);
let func2 = func1(4, 8);
console.log(func2(9, 29));