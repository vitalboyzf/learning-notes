package 算法刷题.回溯;

import java.util.ArrayList;
import java.util.List;

/*
 * https://leetcode-cn.com/problems/permutations/
 * */
public class _46_全排序 {
    public static List<List<Integer>> permute(int[] nums) {
        List<List<Integer>> res = new ArrayList<>();
        List<Integer> path = new ArrayList<>();
        dfs(nums, path, res);
        return res;
    }

    private static void dfs(int[] nums,
                            List<Integer> path,
                            List<List<Integer>> res) {
        if (path.size() == nums.length) {
            // 创建一个新的path添加到res中
            res.add(new ArrayList<>(path));
            return;
        }
        for (int num : nums) {
            // 剪枝，去除重复数字
            if (path.contains(num)) continue;
            path.add(num);
            dfs(nums, path, res);
            // 回溯的过程中，将当前的节点从 path 中删除
            path.remove(path.size() - 1);
        }
    }

    public static void main(String[] args) {
        // 邓太阿 李淳罡 王蚬子
        int[] nums = new int[]{1, 2, 3};
        List<List<Integer>> res = permute(nums);
        System.out.println(res);
    }
}
