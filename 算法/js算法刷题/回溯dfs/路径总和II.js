// https://leetcode-cn.com/problems/path-sum-ii/
const {
    tree
} = require("../二叉树/二叉树的基本操作");
const pathSum = function (root, targetSum) {
    const ret = [];
    const path = [];
    dfs(ret, path, root, targetSum);
    return ret;
};

function dfs(ret, path, root, targetSum) {
    if (!root) return;
    path.push(root.value);
    // 到达叶子节点，并且目标值相等
    if (!root.left && !root.right && targetSum === root.value) {
        ret.push([...path]);
        // 因为需要对路径pop所以不能return，
    }
    dfs(ret, path, root.left, targetSum - root.value);
    dfs(ret, path, root.right, targetSum - root.value);
    path.pop();
}
console.log(pathSum(tree, 6));