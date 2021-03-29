package 算法刷题.回溯;

import java.util.ArrayList;
import java.util.List;

// https://leetcode-cn.com/problems/generate-parentheses/
public class _22_括号生成 {
    public List<String> generateParenthesis(int n) {
        List<String> ret = new ArrayList<>();
        if (n < 0) return ret;
        dfs(0, ret, new char[n << 1], n, n);
        return ret;
    }

    private void dfs(int idx, List<String> ret, char[] path, int leftRemain, int rightRemain) {
        if (idx == path.length) {
            ret.add(new String(path));
            return;
        }
        if (leftRemain > 0) {
            path[idx] = '(';
            dfs(idx + 1, ret, path, leftRemain - 1, rightRemain);
        }
        if (rightRemain > 0 && leftRemain != rightRemain) {
            path[idx] = ')';
            dfs(idx + 1, ret, path, leftRemain, rightRemain - 1);
        }

    }

    public static void main(String[] args) {
        System.out.println(new _22_括号生成().generateParenthesis(3));
    }
}
