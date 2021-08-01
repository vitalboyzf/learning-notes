function dfs(nums, ret, path, vis) {
    if (path.length === nums.length) {
        ret.push([...path]);
        return;
    }
    for (let i = 0; i < nums.length; i++) {
        // 剪枝操作
        if (vis[i] || (i > 0 && nums[i] === nums[i - 1] && !vis[i - 1])) {
            continue;
        }
        path.push(nums[i]);
        // 标记本次循环path填充当前索引位已经用过了
        vis[i] = true;
        dfs(nums, ret, path, vis);
        // 下一次path填充
        vis[i] = false;
        path.pop();
    }
}
const permuteUnique = function (nums) {
    const ret = [];
    const path = [];
    const vis = [];
    nums = nums.sort((a, b) => a - b);
    dfs(nums, ret, path, vis);
    return ret;
};
const nums = [1, 1, 2];
console.log(permuteUnique(nums));