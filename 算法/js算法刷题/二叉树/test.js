function hasPathSum(root, target) {
    if (!root) return false;
    if (!root.left && !root.right) {
        // 到达叶子节点
        return root.value === target;
    }
    const left = hasPathSum(root.left, target - root.value);
    const right = hasPathSum(root.right, target - root.value);
    return left || right;
}