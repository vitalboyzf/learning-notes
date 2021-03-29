package 算法刷题.高频题;

public class _42_接雨水 {
    public int trap(int[] height) {
        int l = 0, r = height.length - 1, lowerMax = 0, water = 0;
        while (l < r) {
            int lower = height[l] <= height[r] ? height[l++] : height[r--];
            lowerMax = Math.max(lowerMax, lower);
            water += lowerMax - lower;
        }
        return water;
    }

    public int trap1(int[] height) {
        int water = 0;
        // 指向倒数第二个索引
        int lastIdx = height.length - 2;
        // 记录左边的最高柱子
        int[] leftMaxes = new int[height.length];
        // 记录右边的最高柱子
        int[] rightMaxes = new int[height.length];
        for (int i = 1; i <= lastIdx; i++) {
            leftMaxes[i] = Math.max(height[i - 1], leftMaxes[i - 1]);
        }
        for (int i = lastIdx; i >= 1; i--) {
            rightMaxes[i] = Math.max(height[i + 1], rightMaxes[i + 1]);
        }
        for (int i = 1; i <= lastIdx; i++) {
            int min = Math.min(leftMaxes[i], rightMaxes[i]);
            // 不能放水
            if (min <= height[i]) continue;
            // 可以放水
            water += min - height[i];
        }
        return water;
    }

    public static void main(String[] args) {
        System.out.println(new _42_接雨水().trap(new int[]{0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1}));
    }
}
