package 算法刷题.字符串;


/*
 * 另一个树的子树
 * https://leetcode-cn.com/problems/subtree-of-another-tree/
 * */
public class _572_ {
    private String postSerialize(TreeNode root) {
        StringBuilder sb = new StringBuilder();
        postSerialize(root, sb);
        return sb.toString();
    }

    private void postSerialize(TreeNode node, StringBuilder sb) {
        if (node.left == null) {
            sb.append("#!");
        } else {
            postSerialize(node.left, sb);
        }
        if (node.right == null) {
            sb.append("#!");
        } else {
            postSerialize(node.right, sb);
        }
        sb.append(node.val).append("!");
    }

    public boolean isSubtree(TreeNode s, TreeNode t) {
        if (s == null || t == null) return false;
        return postSerialize(s).contains(postSerialize(t));
    }
}
