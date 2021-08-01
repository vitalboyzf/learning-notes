const {
    tree
} = require("./二叉树的基本操作");
// 平衡二叉树：每个子树的深度之差不超过1
function isBalanced_Solution(pRoot) {
    function balanced(node) {
        if (!node) {
            return 0;
        }
        // 左边的深度
        const left = balanced(node.left);
        // 右边的深度
        const right = balanced(node.right);
        if (Math.abs(left - right) > 1) {
            return -1;
        }
        // 返回树的深度
        return Math.max(left, right) + 1;
    }
    return balanced(pRoot) !== -1;
}


console.log(isBalanced_Solution(tree));