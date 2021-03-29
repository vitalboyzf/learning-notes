package 算法刷题.每日一题;

import java.util.Arrays;

// https://leetcode-cn.com/problems/reshape-the-matrix/
public class _566_重塑矩阵 {
    public int[][] matrixReshape(int[][] nums, int r, int c) {
        if (r * c != nums.length * nums[0].length) return nums;
        int[][] ret = new int[r][c];
        // 记录当前填充行数
        int row = 0;
        // 记录当前填充列数
        int col = 0;
        // 遍历二维数组
        for (int[] num : nums) {
            for (int j = 0; j < nums[0].length; j++) {
                ret[row][col++] = num[j];
                // 如果col到达了当前行的最大列，行数加一，col置为零，填充下一行
                if (col >= c) {
                    row++;
                    col = 0;
                }
            }
        }
        return ret;
    }

    public static void main(String[] args) {
        int[][] nums = {{1, 2}, {3, 4}, {5, 6}, {6, 8}};
        System.out.println(Arrays.deepToString(new _566_重塑矩阵().matrixReshape(nums, 2, 4)));
    }
}
