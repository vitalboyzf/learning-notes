// https://leetcode-cn.com/problems/permutations/
function permute(nums) {
    const ret = [];
    const path = [];
    dfs(nums, ret, path);
    return ret;

    function dfs(nums, ret, path) {
        if (path.length === nums.length) {
            ret.push([...path]);
            return;
        }
        nums.forEach(num => {
            // 终止本次循环，防止重复数字
            if (path.includes(num)) return;
            path.push(num);
            dfs(nums, ret, path);
            path.pop();
        });
    }
}
const result = permute([1, 2, 3]);
console.log(result);