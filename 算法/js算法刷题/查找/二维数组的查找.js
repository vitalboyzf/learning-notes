function find(target, array) {
    let y = array.length - 1; // y坐标
    let x = 0; // x坐标
    return compare(target, array, y, x);
}

function compare(target, array, row, col) {
    if (array[row] === undefined || array[row][col] === undefined) {
        return false;
    }
    const temp = array[row][col];
    if (target === temp) {
        return true;
    } else if (target > temp) {
        // 目标比当前值大，向右移动x指针查找
        return compare(target, array, row, col + 1);
    } else if (target < temp) {
        // 目标比当前值小，向上移动y指针查找
        return compare(target, array, row - 1, col);
    }
}
console.log(find(17, [
    [1, 3, 5],
    [6, 7, 8],
    [8, 9, 20]
]));

function find1() {

}