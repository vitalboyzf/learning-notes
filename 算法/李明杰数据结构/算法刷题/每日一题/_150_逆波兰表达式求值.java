package 算法刷题.每日一题;

import java.util.Stack;

// https://leetcode-cn.com/problems/evaluate-reverse-polish-notation/
public class _150_逆波兰表达式求值 {
    public int evalRPN(String[] tokens) {
        Stack<Integer> stack = new Stack<>();
        for (String token : tokens) {
            if (isOperator(token)) {
                int num1 = stack.pop();
                int num2 = stack.pop();
                switch (token) {
                    case "+":
                        stack.push(num1 + num2);
                        break;
                    case "-":
                        stack.push(num2 - num1);
                        break;
                    case "*":
                        stack.push(num2 * num1);
                        break;
                    case "/":
                        stack.push(num2 / num1);
                        break;
                    default:
                }
            } else {
                // 是数字
                stack.push(Integer.parseInt(token));
            }
        }
        return stack.pop();
    }

    public boolean isOperator(String c) {
        return c.equals("+") || c.equals("-") || c.equals("*") || c.equals("/");
    }

    public static void main(String[] args) {
        System.out.println(new _150_逆波兰表达式求值().evalRPN(new String[]{"2", "4", "+", "3", "/"}));
    }
}
