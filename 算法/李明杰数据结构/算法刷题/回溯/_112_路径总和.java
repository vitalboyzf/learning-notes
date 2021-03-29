package 算法刷题.回溯;

/*
 * https://leetcode-cn.com/problems/path-sum/
 * */

import 算法刷题.二叉树.TreeNode;

public class _112_路径总和 {
    public static boolean hasPathSum(TreeNode root, int targetSum) {
        if (root == null) {
            return false;
        }
        // 到了叶子节点，剩余targetSum是否等于当前节点的值，如果等于说明这条路是通的
        if (root.left == null && root.right == null) {
            return targetSum - root.val == 0;
        }
        boolean leftHasPathSum = hasPathSum(root.left, targetSum - root.val);
        // （优化）如果左边找到了，就不用再去找右边
        if (leftHasPathSum) return true;
        return hasPathSum(root.right, targetSum - root.val);
    }

    public static void main(String[] args) {
        TreeNode treeNode = new TreeNode(3);
        System.out.println(hasPathSum(treeNode, 2));
    }
}
