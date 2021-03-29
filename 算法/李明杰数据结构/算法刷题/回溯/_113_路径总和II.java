package 算法刷题.回溯;

import 算法刷题.二叉树.TreeNode;

import java.util.LinkedList;
import java.util.List;

public class _113_路径总和II {
    private final List<List<Integer>> res = new LinkedList<>();
    private final List<Integer> path = new LinkedList<>();

    public List<List<Integer>> pathSum(TreeNode root, int targetSum) {
        dfs(root, targetSum);
        return res;
    }

    private void dfs(TreeNode root, int targetSum) {
        if (root == null) return;
        path.add(root.val);
        // 到达叶子节点，如果满足条件，将当前path添加到结果列表中
        if (root.left == null && root.right == null && targetSum == root.val) {
            res.add(new LinkedList<>(path));
        }

        dfs(root.left, targetSum - root.val);
        dfs(root.right, targetSum - root.val);
        // 回溯，将path最后一个元素删除
        path.remove(path.size() - 1);
    }

    public static void main(String[] args) {
        TreeNode A = new TreeNode(5);
        TreeNode B = new TreeNode(4);
        TreeNode C = new TreeNode(8);
        TreeNode D = new TreeNode(11);
        TreeNode E = new TreeNode(13);
        TreeNode F = new TreeNode(4);
        TreeNode G = new TreeNode(7);
        TreeNode H = new TreeNode(2);
        TreeNode I = new TreeNode(5);
        TreeNode J = new TreeNode(1);
        A.left = B;
        A.right = C;
        B.left = D;
        D.left = G;
        D.right = H;
        C.left = E;
        C.right = F;
        F.left = I;
        F.right = J;
        System.out.println(new _113_路径总和II().pathSum(A, 22));
    }
}
