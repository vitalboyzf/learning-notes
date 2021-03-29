package 算法刷题.二叉树;

/*
 * 二叉树的最近公共祖先
 * https://leetcode-cn.com/problems/lowest-common-ancestor-of-a-binary-tree/
 * */
public class _236_ {
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        if (root == null || root == p || root == q) return root;
        TreeNode left = lowestCommonAncestor(root.left, p, q);
        TreeNode right = lowestCommonAncestor(root.right, p, q);
        // 如果一个节点在左边，一个节点在右边，那么这个节点就是最近公共祖先
        if (left != null && right != null) return root;
        // 如果right为空，就说明没有找到right，只可能因为right是left的子节点，
        // 因为left先被找到了，就不会再去遍历left的子节点，所以left就是最近公共祖先
        return (left != null) ? left : right;
    }
}
