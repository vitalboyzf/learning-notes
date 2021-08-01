// https://leetcode-cn.com/problems/count-complete-tree-nodes/
/**
 * @param {TreeNode} root
 * @return {number}
 */
const countNodes = function (root) {
    const stack = [];

    function dfs(root) {
        if (!root) return;
        stack.push(root);
        dfs(root.left);
        dfs(root.right);
    }
    dfs(root);
    return stack.length;
};