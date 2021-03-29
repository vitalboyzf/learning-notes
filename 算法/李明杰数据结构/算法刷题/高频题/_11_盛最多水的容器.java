package 算法刷题.高频题;

// https://leetcode-cn.com/problems/container-with-most-water/submissions/
public class _11_盛最多水的容器 {
    public int maxArea(int[] height) {
        if (height == null || height.length == 0) return 0;
        int left = 0;
        int right = height.length - 1;
        int water = 0;
        while (left < right) {
            // 左边的柱子长
            if (height[left] > height[right]) {
                water = Math.max(water, (right - left) * height[right]);
                right--;
            }
            // 右边的柱子长
            else {
                water = Math.max(water, (right - left) * height[left]);
                left++;
            }
        }
        return water;
    }
}
