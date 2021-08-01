function debounce(func, duration = 500) {
    let timer = null;
    return (...args) => {
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }
        timer = setTimeout(() => {
            func.apply(this, args);
        }, duration);
    };
}

function throttle(func, timing = 500) {
    let preDate = 0;
    let timer = null;
    return (...args) => {
        const remaining = timing - (Date.now() - preDate);
        if (remaining <= 0) {
            // 时间到了，执行函数
            preDate = Date.now();
            func.apply(this, args);
            clearTimeout(timer);
            timer = null;
        } else if (!timer) {
            timer = setTimeout(() => {
                preDate = Date.now();
                func.apply(this, args);
                timer = null;
            }, remaining);
        }
    };
}
const obj = {
    name: "zf"
};

function test() {
    console.log(this);
}

function call(func, obj) {
    obj["temp"] = func;
    const result = obj["temp"]();
    delete obj["temp"];
    return result;
}
call(test, obj);