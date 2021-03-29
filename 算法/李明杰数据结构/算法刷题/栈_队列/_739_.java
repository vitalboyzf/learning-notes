package 算法刷题.栈_队列;

import java.util.Arrays;
import java.util.Stack;

/*
 * 每日温度
 * https://leetcode-cn.com/problems/daily-temperatures/
 * */
public class _739_ {
    public static int[] dailyTemperatures(int[] T) {
        if (T == null || T.length == 0) return null;
        Stack<Integer> stack = new Stack<>();
        int[] result = new int[T.length];
        for (int i = 0; i < T.length; i++) {
            while (!stack.isEmpty() && T[i] > T[stack.peek()]) {
                result[stack.peek()] = i - stack.peek();
                stack.pop();
            }
            stack.push(i);
        }
        return result;
    }



    public static void main(String[] args) {
        int[] temperatures = {2, 3, 1, 5};
        // 2 3 1 5
        // 0 1 2 3
        System.out.println(Arrays.toString(dailyTemperatures(temperatures)));
    }
}
