package 算法刷题.每日一题;

import java.util.Arrays;

// https://leetcode-cn.com/problems/range-sum-query-2d-immutable/
public class _304_二维区域和检索矩阵不变 {
    private int[][] sums;

    public _304_二维区域和检索矩阵不变(int[][] matrix) {
        int rows = matrix.length;
        if (rows > 0) {
            int cols = matrix[0].length;
            sums = new int[rows][cols + 1];
            for (int i = 0; i < rows; i++) {
                for (int j = 0; j < cols; j++) {
                    sums[i][j + 1] = sums[i][j] + matrix[i][j];
                }
            }
        }
        System.out.println(Arrays.deepToString(sums));
    }

    public int sumRegion(int row1, int col1, int row2, int col2) {
        int sum = 0;
        for (int i = row1; i <= row2; i++) {
            sum += sums[i][col2 + 1] - sums[i][col1];
        }
        return sum;
    }

    public static void main(String[] args) {
        int[][] matrix = {
                {3, 0, 1, 4, 2},
                {5, 6, 3, 2, 1},
                {1, 2, 0, 1, 5},
                {4, 1, 0, 1, 7},
                {1, 0, 3, 0, 5}
        };
        System.out.println(new _304_二维区域和检索矩阵不变(matrix).sumRegion(2, 1, 4, 3));
    }
}
