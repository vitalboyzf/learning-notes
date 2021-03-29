package 算法刷题.栈_队列;

import java.util.Arrays;
import java.util.Stack;

class TreeNode {
    public int val;
    public TreeNode left;
    public TreeNode right;

    public TreeNode(int x) {
        this.val = x;
    }
}

public class _654_ {
    private TreeNode findRoot(int[] nums, int left, int right) {
        // left right取左闭右开区间
        if (left == right) return null;
        int maxIdx = left;
        for (int i = left + 1; i < right; i++) {
            if (nums[i] > nums[maxIdx]) {
                maxIdx = i;
            }
        }
        TreeNode root = new TreeNode(nums[maxIdx]);
        root.left = findRoot(nums, left, maxIdx);
        root.right = findRoot(nums, maxIdx + 1, right);
        return root;
    }

    // 构建最大二叉树
    public TreeNode constructMaximumBinaryTree(int[] nums) {
        return findRoot(nums, 0, nums.length);
    }

    // 返回一个数组，数组里面存着每个节点的父节点索引（如果没有父节点，就存-1）
    public static int[] findFatherIndexArr(int[] nums) {
        if (nums == null || nums.length == 0) return null;
        // 储存左边第一个比他大的节点
        int[] lis = new int[nums.length];
        // 存储右边第一个比他大的节点
        int[] ris = new int[nums.length];
        // 一个从下到上索引对应元素递减的栈
        Stack<Integer> stack = new Stack<>();
        for (int i = 0; i < nums.length; i++) {
            // 初始化ris默认元素值为1
            ris[i] = -1;
            // 如果栈不为空，并且当前要入栈元素的值大于栈顶元素的值，出栈，并记录右边第一个比它大的索引
            while (!stack.isEmpty() && nums[i] > nums[stack.peek()]) {
                ris[stack.pop()] = i;
            }
            // 如果栈为空或者当前要入栈的值小于栈顶元素的值，记录左边第一个比它大的索引
            lis[i] = stack.isEmpty() ? -1 : stack.peek();
            stack.push(i);
        }
        int[] pis = new int[nums.length];
        for (int i = 0; i < pis.length; i++) {
            if (lis[i] == -1 && ris[i] == -1) {
                pis[i] = -1;
                continue;
            }
            if (lis[i] == -1) {
                pis[i] = ris[i];
            } else if (ris[i] == -1) {
                pis[i] = lis[i];
            } else if (nums[lis[i]] < nums[ris[i]]) {
                pis[i] = lis[i];
            } else {
                pis[i] = ris[i];
            }
        }
        return pis;
    }

    public static void main(String[] args) {
        int[] nums = {3, 2, 1, 6, 0, 5};
        System.out.println(Arrays.toString(findFatherIndexArr(nums)));
    }
}
