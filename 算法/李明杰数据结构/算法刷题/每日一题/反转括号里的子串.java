package 算法刷题.每日一题;

import java.util.Arrays;
import java.util.Stack;

// https://leetcode-cn.com/problems/reverse-substrings-between-each-pair-of-parentheses/
public class 反转括号里的子串 {
    public String reverse(String str, int start, int end) {
        char[] strArr = str.toCharArray();
        for (int i = 0; i < strArr.length; i++) {
            strArr[i] = strArr[i + 1];

        }
        System.out.println(Arrays.toString(strArr));
        while (start < end) {
            char temp = strArr[start];
            strArr[start] = strArr[end];
            strArr[end] = temp;
            start++;
            end--;
        }
        return String.valueOf(strArr);
    }

    public String reverseParentheses(String s) {
        int i = 0;
        Stack<Character> stack = new Stack<>();
        int start = 0;
        int end = 0;

        while (i < s.length()) {
            char item = s.charAt(i);
            System.out.println(item);
            if (item == '(') {
                start = i;
            } else if (item == ')') {
                end = i;
            }

            stack.push(item);
            if (start != 0 && end != 0) {
                System.out.println(start + "_" + end);
                s = reverse(s, start, end);
            }
            i++;
        }
        return s;
    }

    public static void main(String[] args) {
        System.out.println(new 反转括号里的子串().reverse("abc", 0, 2));
        System.out.println(new 反转括号里的子串().reverseParentheses("(abc)"));
    }
}
