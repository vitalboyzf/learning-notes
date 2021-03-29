Array.prototype.v_reduce = function (callback, initValue) {
    let result = initValue;
    const array = this;
    let i = 0;
    if (typeof result === "undefined") {
        result = array[0];
        i = 1;
    }
    for (; i < array.length; i++) {
        result = callback(result, array[i], i);
    }
    return result;
};