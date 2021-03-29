function throttle(func, wait = 300) {
    let preDate = 0;
    let timer = null;
    return (...params) => {
        const nowDate = Date.now();
        const remaining = wait - (nowDate - preDate);
        if (remaining <= 0) {
            // 时间到了，触发函数
            preDate = nowDate;
            clearTimeout(timer);
            timer = null;
            func.call(this, ...params);
        } else if (timer === null) {
            timer = setTimeout(() => {
                preDate = Date.now();
                func.call(this, ...params);
                timer = null;
            }, remaining);
        }
    };
}
window.onscroll = throttle(() => {
    console.log("触发");
}, 500);