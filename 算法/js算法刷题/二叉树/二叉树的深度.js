// 二叉树的最大深度
function treeDepth(pRoot) {
    if (!pRoot) return 0;
    return Math.max(treeDepth(pRoot.left), treeDepth(pRoot.right)) + 1;
}
// 二叉树的最小深度
function minDepth(root) {
    if (!root) {
        return 0;
    }
    if (!root.left) {
        return 1 + minDepth(root.right);
    }
    if (!root.right) {
        return 1 + minDepth(root.left);
    }
    return Math.min(minDepth(root.left), minDepth(root.right)) + 1;
}