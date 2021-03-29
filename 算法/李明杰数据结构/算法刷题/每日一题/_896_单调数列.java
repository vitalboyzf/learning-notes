package 算法刷题.每日一题;

// https://leetcode-cn.com/problems/monotonic-array/
public class _896_单调数列 {
    public boolean isMonotonic(int[] A) {
        // 小于2直接为true
        if (A.length <= 2) return true;
        // 判断是否为升序序列
        boolean AscendingOrder = true;
        int idx = 0;
        // 遇到相同的元素，idx索引加一，直到A[idx] != A[idx+1]
        while (A[idx] == A[idx + 1] && idx < A.length - 2) idx++;
        // 此时A[idx] != A[idx+1]，如果A[idx] < A[idx + 1]就为升序，否则为降序
        AscendingOrder = A[idx] < A[idx + 1];
        for (int i = idx + 1; i < A.length; i++) {
            // 升序判断
            if (A[i] < A[i - 1] && AscendingOrder) return false;
            // 降序判断
            if (A[i] > A[i - 1] && !AscendingOrder) return false;
        }
        return true;
    }

    public static void main(String[] args) {
        System.out.println(new _896_单调数列().isMonotonic(new int[]{9, 9, 9}));
    }
}
