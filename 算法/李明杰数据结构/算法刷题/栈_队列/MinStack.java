package 算法刷题.栈_队列;

import java.util.Stack;

public class MinStack {
    private final Stack<Integer> stack;
    private final Stack<Integer> minStack;

    public MinStack() {
        stack = new Stack<>();
        minStack = new Stack<>();
    }

    public void push(int el) {
        stack.push(el);
        if (minStack.isEmpty()) {
            minStack.push(el);
        } else {
            minStack.push(Math.min(minStack.peek(), el));
        }
    }

    public void pop() {
        stack.pop();
        minStack.pop();
    }

    public int top() {
        return stack.peek();
    }

    public int getMin() {
        return minStack.peek();
    }
}
