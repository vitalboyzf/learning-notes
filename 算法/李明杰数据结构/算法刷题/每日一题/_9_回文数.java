package 算法刷题.每日一题;

import java.util.Stack;

// https://leetcode-cn.com/problems/palindrome-number/
public class _9_回文数 {
    public boolean isPalindrome(int x) {
        String str = Integer.toString(x);
        int start = 0;
        int end = str.length() - 1;
        while (start < end) {
            if (str.charAt(start++) != str.charAt(end--)) return false;
        }
        return true;
    }

    public static void main(String[] args) {
        System.out.println(new _9_回文数().isPalindrome(121));
    }
}
