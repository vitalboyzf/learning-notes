function compose(...middleware) {
    return function (arg) {
        let nextReturn = arg;
        for (let i = middleware.length - 1; i >= 0; i--) {
            const func = middleware[i];
            nextReturn = func.call(this, nextReturn);
        }
        return nextReturn;
    };
}

function compose2(...middleware) {
    if (middleware.length === 0) return (args) => args;
    if (middleware.length === 1) return middleware[0];
    return middleware.reduce((pre, cur) => {
        return (...arg) => {
            return pre(cur(...arg));
        };
    });
}

function compose3(...middleware) {
    return x => {
        if (middleware.length === 0) return x;
        return middleware.reduceRight((result, cur) => {
            return cur(result);
        }, x);
    };
}

function A(x) {
    return 1 + x;
}

function B(x) {
    return 2 * x;
}

function C(x) {
    return x - 3;
}
const mid = compose3(A, B, C);
console.log(mid(10)); // 15