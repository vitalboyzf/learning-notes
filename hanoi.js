const hanoi = function (n, A, B, C) {
    if (n === 1) {
        console.log(`${A} --> ${C}`);

    } else {
        // 将第一个塔的圆盘移动到第二个塔
        hanoi(n - 1, A, C, B);
        // 将第一个塔的圆盘移动到第三个塔
        console.log(`${A} --> ${C}`);
        // 将第二个塔移动到第三个塔
        hanoi(n - 1, B, A, C);
    }
};
hanoi(2, "塔1", "塔2", "塔3");