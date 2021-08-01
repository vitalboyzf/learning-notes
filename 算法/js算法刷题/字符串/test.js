function move0(arr) {
    let cur = 0;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === 0) continue;
        if (i !== cur) {
            arr[cur] = arr[i];
            arr[i] = 0;
        }
        cur++;
    }
    return arr;
}
console.log(move0([1, 0, 0, 2, 3, 0, 5]));