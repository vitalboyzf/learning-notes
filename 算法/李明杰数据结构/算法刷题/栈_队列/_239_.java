package 算法刷题.栈_队列;

import java.util.Arrays;
import java.util.Deque;
import java.util.LinkedList;

/*
 * 滑动窗口最大值
 * https://leetcode-cn.com/problems/sliding-window-maximum/
 * */
public class _239_ {
    public static int[] maxSlidingWindow(int[] nums, int k) {
        if (nums.length == 0 || k < 1) return new int[0];
        if (k == 1) return nums;
        int maxIdx = 0;
        // 找出前k个元素的最大值
        for (int i = 1; i < k; i++) {
            if (nums[i] > nums[maxIdx]) {
                maxIdx = i;
            }
        }
        int[] maxes = new int[nums.length - k + 1];
        for (int li = 0; li < maxes.length; li++) {
            int ri = li + k - 1;
            // 最大值索引不在范围内，需要重新扫描
            if (maxIdx < li) {
                maxIdx = li;
                for (int i = li + 1; i <= ri; i++) {
                    if (nums[i] > nums[maxIdx]) {
                        maxIdx = i;
                    }
                }
            }
            // 最大值索引不在范围，并且新加入的值大于最大值
            else if (nums[ri] > nums[maxIdx]) {
                maxIdx = ri;
            }
            maxes[li] = nums[maxIdx];
        }
        return maxes;
    }

    public int[] maxSlidingWindow_deque(int[] nums, int k) {
        if (nums.length == 0 || k < 1) return new int[0];
        if (k == 1) return nums;
        int[] maxes = new int[nums.length - k + 1];
        // 双端队列，记录nums的索引，顺序为nums元素从大到小
        Deque<Integer> deque = new LinkedList<>();
        for (int i = 0; i < nums.length; i++) {
            // 如果队列不为空，并且新元素大于等于队列的最后一个元素，删除队列最后一个元素
            while (!deque.isEmpty() && nums[i] >= nums[deque.getLast()]) {
                deque.removeLast();
            }
            // 如果队列为空，或者当前元素小于队尾元素，将i添加到队尾
            deque.addLast(i);
            // 检查窗口合法性，w为窗口的第一个元素的索引
            int w = i - k + 1;
            // 如果w小于0，说明不合法，不需要继续判断
            if (w < 0) continue;
            // 检查队头合法性
            // 如果队头索引小于当前窗口，队头已经过期，删除队头元素
            if (deque.getFirst() < w) {
                deque.removeFirst();
            }
            // 设置窗口最大值
            maxes[w] = nums[deque.getFirst()];
        }
        return maxes;
    }

    public static void main(String[] args) {
        int[] nums = {1, 3, -1, -3, 5, 3, 6, 7};
        System.out.println(Arrays.toString(maxSlidingWindow(nums, 3)));
    }
}
