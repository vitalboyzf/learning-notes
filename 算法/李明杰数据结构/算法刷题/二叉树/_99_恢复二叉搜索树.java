package 算法刷题.二叉树;

// https://leetcode-cn.com/problems/recover-binary-search-tree/

public class _99_恢复二叉搜索树 {
    private TreeNode prev;
    private TreeNode first;
    private TreeNode second;

    private void findWrongNodes(TreeNode root) {
        // 第一个逆序对的较大值就是第一个错误的值
        // 最后一个逆序对的较小值就是第二个错误的值
        if (root == null) return;
        // 中序遍历
        findWrongNodes(root.left);
        // 找到一个逆序对
        if (prev != null && prev.val > root.val) {
            // 找到较小的值，后面的逆序较小值对覆盖second
            second = root;
            // 找到第一个逆序对较大的值
            if (first == null) {
                first = prev;
            }
        }
        // 保存当前节点，作为下一个节点的上一个节点
        prev = root;
        findWrongNodes(root.right);
    }

    public void recoverTree(TreeNode root) {
        // 二叉树的中序遍历是升序的
        findWrongNodes(root);
        int temp = first.val;
        first.val = second.val;
        second.val = temp;
    }
}
