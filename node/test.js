function throttle(func, time) {
    let preDate = 0;
    let timer = null;
    return (...args) => {
        let curDate = Date.now();
        let remaining = time - (curDate - preDate);
        if (remaining <= 0) {
            // 到达时间，执行
            func.call(this, ...args);
            clearTimeout(timer);
            timer = null;
            preDate = Date.now();
        } else if (!timer) {
            //  没有到达时间
            timer = setTimeout(() => {
                func.call(this, ...args);
                timer = null;
                preDate = Date.now();
            }, remaining);
        }

    };
}