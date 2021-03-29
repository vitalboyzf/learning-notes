package 算法刷题.回溯;

import java.util.ArrayList;
import java.util.List;

// https://leetcode-cn.com/problems/letter-combinations-of-a-phone-number/
public class _17_电话号码的字母组合 {
    private final char[][] lettersArray = {
            {'a', 'b', 'c'},
            {'d', 'e', 'f'},
            {'g', 'h', 'i'},
            {'j', 'k', 'l'},
            {'m', 'n', 'o'},
            {'p', 'q', 'r', 's'},
            {'t', 'u', 'v'},
            {'w', 'x', 'y', 'z'}
    };

    public List<String> letterCombinations(String digits) {
        if (digits == null) return null;
        List<String> ret = new ArrayList<>();
        char[] path = new char[digits.length()];
        char[] charsDigits = digits.toCharArray();
        if (charsDigits.length == 0) return ret;
        dfs(0, ret, path, charsDigits);
        return ret;
    }

    private void dfs(int idx, List<String> ret, char[] path, char[] charsDigits) {
        if (idx == path.length) {
            ret.add(new String(path));
            return;
        }
        char[] letters = lettersArray[charsDigits[idx] - '2'];
        for (char letter : letters) {
            path[idx] = letter;
            dfs(idx + 1, ret, path, charsDigits);
        }
    }

    public static void main(String[] args) {
        System.out.println(new _17_电话号码的字母组合().letterCombinations("23"));
    }
}
