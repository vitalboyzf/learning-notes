function moveZeroes(nums) {
    // 指向0的索引位置
    let cur = 0;
    for (let i = 0; i < nums.length; i++) {
        // 遇到0跳出本次循环（i++,cur不加）
        if (nums[i] === 0) continue;
        // 如果cur和i相等，且都不等于0，就不能进行赋值0操作
        if (cur !== i) {
            nums[cur] = nums[i];
            nums[i] = 0;
        }
        cur++;
    }
}
const arr = [1, 0];
moveZeroes(arr);
console.log(arr);