package 算法刷题.字符串;

import java.util.Arrays;

// https://leetcode-cn.com/problems/permutation-in-string/
public class _567_字符串的排列 {

    public boolean checkInclusion(String s1, String s2) {
        int lenS1 = s1.length();
        int lenS2 = s2.length();
        if (lenS1 > lenS2) return false;
        int[] arr1 = new int[26];
        int[] arr2 = new int[26];
        for (int i = 0; i < lenS1; i++) {
            arr1[s1.charAt(i) - 'a']++;
            arr2[s2.charAt(i) - 'a']++;
        }
        if (Arrays.equals(arr1, arr2)) {
            return true;
        }
        for (int i = lenS1; i < lenS2; i++) {
            // 窗口后加一个元素，删除窗口第一个元素（窗口右移）
            arr2[s2.charAt(i) - 'a']++;
            arr2[s2.charAt(i - lenS1) - 'a']--;
            if (Arrays.equals(arr1, arr2)) {
                return true;
            }
        }
        return false;
    }

    public static void main(String[] args) {
        System.out.println(new _567_字符串的排列().checkInclusion("ab", "eidbaooo"));
    }
}
