package 算法刷题.二叉树;

// VIP题库 n^2
public class _333_最大二叉搜索子树 {
    // 判断是否为二叉搜索树
    private boolean isBST(TreeNode root) {
        return isBST(root, Integer.MIN_VALUE, Integer.MAX_VALUE);
    }

    private boolean isBST(TreeNode root, int min, int max) {
        if (root == null) return true;
        return min < root.val &&
                root.val < max &&
                isBST(root.left, min, root.val) &&
                isBST(root.right, root.val, max);
    }

    // 返回root的节点数量
    private int nodesCount(TreeNode root) {
        if (root == null) return 0;
        return 1 + nodesCount(root.left) + nodesCount(root.right);
    }

    public int largestBSTSubtree(TreeNode root) {
        if (root == null) return 0;
        if (isBST(root)) return nodesCount(root);
        return Math.max(largestBSTSubtree(root.left),
                largestBSTSubtree(root.right));
    }
}
