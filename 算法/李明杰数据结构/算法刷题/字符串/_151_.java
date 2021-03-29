package 算法刷题.字符串;

/*
 * 翻转字符串里的单词
 * https://leetcode-cn.com/problems/reverse-words-in-a-string/
 * */
public class _151_ {
    private static void reverse(char[] chars, int li, int ri) {
        ri--;
        while (li < ri) {
            char temp = chars[li];
            chars[li] = chars[ri];
            chars[ri] = temp;
            li++;
            ri--;
        }
    }

    public static String reverseWords(String s) {
        if (s == null) return "";
        char[] chars = s.toCharArray();
        // 记录当前要赋值的元素的前一个元素是否为空格
        boolean space = true;
        // 记录下一个需要被赋值的位置
        int cur = 0;
        // 记录去电多余空格的字符串的长度
        int len = 0;
        // 扫描整个字符数组
        for (int i = 0; i < chars.length; i++) {
            // 如果扫描到不为空格的位置（有字母的位置）
            if (chars[i] != ' ') {
                // 将扫描到的字符赋值给要赋值的位置，要赋值的位置后移
                chars[cur++] = chars[i];
                // 下一个要赋值的元素的前一个不是空字符
                space = false;
            }
            // 如果当前被赋值元素的前一个字符不是空格
            else if (!space) {
                // 给当前要赋值的元素赋值为空字符，当前要赋值元素后移
                chars[cur++] = ' ';
                // 下一个要赋值元素的前一个是空字符
                space = true;
            }
        }
        // 如果扫描结束后，扫描到的最后一个字符是非空字符，len就是cur
        // 如果扫描到的最后一个字符是空字符，len就是cur-1
        len = space ? cur - 1 : cur;
        if (len <= 0) return "";
        reverse(chars, 0, len);
        int prevSpaceIndex = -1;
        for (int i = 0; i < len; i++) {
            if (chars[i] != ' ') {
                continue;
            }
            reverse(chars, prevSpaceIndex + 1, i);
            prevSpaceIndex = i;
        }
        // 翻转最后一个空格
        reverse(chars, prevSpaceIndex + 1, len);
        return new String(chars, 0, len);
    }

    public static void main(String[] args) {

        System.out.println(reverseWords(" are you   ok!  "));
    }
}
