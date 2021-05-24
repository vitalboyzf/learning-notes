// console.time();

// function sum(n) {
//     if (n === 1) return 1;
//     if (n === 2) return 2;
//     return sum(n - 1) + sum(n - 2);
// }
// console.log(sum(40));
// console.timeEnd();
console.time();
const arr = [];

function sumDp(n) {
    if (n === 1) return 1;
    if (n === 2) return 2;
    if (arr[n]) {
        return arr[n];
    } else {
        const s = sumDp(n - 1) + sumDp(n - 2);
        arr[n] = s;
        return s;
    }
}
console.log(sumDp(1152));

console.log(arr);
console.timeEnd();