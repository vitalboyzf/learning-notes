function hasPathSum(root, targetSum) {
    if (!root) return false;
    if (!root.left && !root.right) {
        // 到达叶子节点
        return root.val === targetSum;
    }
    const leftIsHas = hasPathSum(root.left, targetSum - root.val);
    if (leftIsHas) return true;
    return hasPathSum(root.right, targetSum - root.val);
}