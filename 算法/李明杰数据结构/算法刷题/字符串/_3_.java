package 算法刷题.字符串;

import java.util.HashMap;
import java.util.Map;

/*
 * 无重复字符的最长子串
 * https://leetcode-cn.com/problems/longest-substring-without-repeating-characters/
 * */
public class _3_ {
    public static int lengthOfLongestSubstring(String s) {
        if (s == null) return 0;
        char[] chars = s.toCharArray();
        if (chars.length == 0) return 0;
        // 用于保存每一个字符上一次出现的位置
        Map<Character, Integer> prevIdxes = new HashMap<>();
        prevIdxes.put(chars[0], 0);
        // i - 1位置字符结尾的最长不重复字符串的开始索引
        int li = 0;
        int max = 1;
        for (int i = 1; i < chars.length; i++) {
            Integer pi = prevIdxes.get(chars[i]);
            if (pi != null && li <= pi) {
                li = pi + 1;
            }
            // 存储这个字符出现的位置
            prevIdxes.put(chars[i], i);
            // 更新最长不重复子串的长度
            max = Math.max(max, i - li + 1);
        }
        System.out.println(prevIdxes);
        return max;
    }

    public static void main(String[] args) {
        System.out.println(lengthOfLongestSubstring("afesau"));
    }
}
