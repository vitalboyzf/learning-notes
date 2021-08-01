const combinationSum = function (candidates, target) {
    const ret = [];
    const path = [];
    dfs(ret, candidates, 0, target, path);
    return ret;
};

function dfs(ret, candidates, start, target, path) {
    if (target < 0) return;
    if (target === 0) {
        ret.push([...path]);
        return;
    }
    // 从start开始，避免重复
    for (let i = start; i < candidates.length; i++) {
        path.push(candidates[i]);
        dfs(ret, candidates, i, target - candidates[i], path);
        // 回溯
        path.pop();
    }
}
const candidates = [2, 3, 6, 7],
    target = 7;
console.log(combinationSum(candidates, target));