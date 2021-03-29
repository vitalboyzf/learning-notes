function debounce(func, wait = 300, immediate = false) {
    let timer = null;
    return (...params) => {
        const nowExec = immediate && !timer;
        clearTimeout(timer);
        timer = setTimeout(() => {
            timer = null;
            !immediate && func.call(this, ...params);
        }, wait);
        nowExec && func.call(this, ...params);
    };
}
const btn = document.querySelector("button");
const handler = (e) => { console.log(e); };
btn.addEventListener("click", debounce(handler, undefined, true));