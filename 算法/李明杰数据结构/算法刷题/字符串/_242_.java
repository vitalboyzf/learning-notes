package 算法刷题.字符串;

import java.util.Arrays;

/*
 * 有效的字母异位词
 * https://leetcode-cn.com/problems/valid-anagram/
 * */
public class _242_ {
    public static boolean isAnagram(String s, String t) {
        if (s == null || t == null) return false;
        if (s.length() != t.length()) return false;
        int[] counts = new int[26];
        for (int i = 0; i < s.length(); i++) {
            counts[s.charAt(i) - 'a']++;
        }
        for (int j = 0; j < t.length(); j++) {
            if (--counts[t.charAt(j) - 'a'] < 0) return false;
        }
        return true;
    }

    public static void main(String[] args) {
        System.out.println(isAnagram("abcdae", "bcdyfe"));
    }
}
