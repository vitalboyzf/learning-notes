package 算法刷题.栈_队列;

import java.util.Stack;

/*
接雨水
https://leetcode-cn.com/problems/trapping-rain-water/
* */
public class _42_ {
    public static int trap(int[] height) {
        if (height == null) {
            return 0;
        }

        Stack<Integer> stack = new Stack<>();
        int count = 0;
        int c = 1;
        for (int i = 0; i < height.length; i++) {
            while (!stack.isEmpty() && height[stack.peek()] < height[i]) {
                // 水面底部的索引
                int top = stack.pop();
                System.out.println("第" + c++ + "次上坡：");
                System.out.println(stack);
                System.out.println("i:" + i + "_" + "top:" + top);
                if (stack.isEmpty()) {
                    break;
                } else {
                    int peek = stack.peek();
                    System.out.println("peek:" + peek);
                    int width = i - peek - 1;
                    System.out.println("width:" + width);
                    int h = Math.min(height[peek], height[i]) - height[top];
                    System.out.println("h:" + h);
                    count = count + width * h;
                }
            }
            stack.push(i);
        }
        return count;
    }

    public static void main(String[] args) {
        int[] nums = new int[]{0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1};
        System.out.println(trap(nums));
    }
}
