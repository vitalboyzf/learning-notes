function insertSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        for (let j = i; j >= 1; j--) {
            if (arr[j] >= arr[j - 1]) break;
            let temp = arr[j];
            arr[j] = arr[j - 1];
            arr[j - 1] = temp;
        }
    }
}