package 算法刷题.回溯;

import java.util.ArrayList;
import java.util.List;

// https://leetcode-cn.com/problems/combination-sum/
public class _39_组合总和 {
    public List<List<Integer>> combinationSum(int[] candidates, int target) {
        List<List<Integer>> ret = new ArrayList<>();
        List<Integer> path = new ArrayList<>();
        if (candidates.length == 0) return ret;
        dfs(candidates, 0, target, path, ret);
        return ret;
    }

    private void dfs(int[] candidates, int begin, int target, List<Integer> path, List<List<Integer>> ret) {
        if (target < 0) return;
        if (target == 0) {
            ret.add(new ArrayList<>(path));
            return;
        }
        // 从begin开始，不看前面的，避免重复
        for (int i = begin; i < candidates.length; i++) {
            path.add(candidates[i]);
            dfs(candidates, i, target - candidates[i], path, ret);
            // 回退
            path.remove(path.size() - 1);
        }
    }

    public static void main(String[] args) {
        System.out.println(new _39_组合总和()
                .combinationSum(new int[]{2, 3, 6, 7}, 7));
    }
}
