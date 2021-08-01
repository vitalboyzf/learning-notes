// 查找最长逆序对
const subSort = function (array) {
    if (array.length === 0) return [-1, -1];
    let max = array[0];
    let r = -1;
    for (let i = 1; i < array.length; i++) {
        if (array[i] >= max) {
            max = array[i];
        } else {
            r = i;
        }
    }
    if (r === -1) {
        return [-1, -1];
    }
    let min = array[array.length - 1];
    let l = -1;
    for (let i = array.length - 2; i >= 0; i--) {
        if (array[i] <= min) {
            min = array[i];
        } else {
            l = i;
        }
    }
    return [l, r];
};
console.log(subSort([1, 2, 4, 7, 10, 11, 7, 12, 6, 7, 16, 18, 19]));