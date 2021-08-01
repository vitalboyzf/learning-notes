function jump(num) {
    if (num < 0) return 0;
    if (num <= 2) return num;
    return jump(num - 1) + jump(num - 2);
}
console.log(jump(5));