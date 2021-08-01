// https://leetcode-cn.com/problems/generate-parentheses/
const generateParenthesis = function (n) {
    const ret = [];
    if (n < 0) return ret;

    const path = new Array(n << 1);
    dfs(0, ret, path, n, n);
    return ret;
};

function dfs(idx, ret, path, leftRemain, rightRemain) {
    if (idx === path.length) {
        ret.push(path.toString().replace(/,/g, ""));
        return;
    }
    if (leftRemain > 0) {
        path[idx] = "(";
        dfs(idx + 1, ret, path, leftRemain - 1, rightRemain);
    }
    if (rightRemain > 0 && leftRemain !== rightRemain) {
        path[idx] = ")";
        dfs(idx + 1, ret, path, leftRemain, rightRemain - 1);
    }
}
console.log(generateParenthesis(3));