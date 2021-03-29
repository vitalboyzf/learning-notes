package 算法刷题.高频题;

import java.util.ArrayList;
import java.util.List;

public class _54_螺旋矩阵 {
    public List<Integer> spiralOrder(int[][] matrix) {
        if (matrix == null) return null;
        List<Integer> ret = new ArrayList<>();
        if (matrix.length == 0) return ret;
        int top = 0;
        int bottom = matrix.length - 1;
        int left = 0;
        int right = matrix[0].length - 1;
        while (top <= bottom && left <= right) {
            for (int i = left; i <= right; i++) {
                ret.add(matrix[top][i]);
            }
            top++;
            for (int i = top; i <= bottom; i++) {
                ret.add(matrix[i][right]);
            }
            right--;
            if (top > bottom || left > right) break;
            for (int i = right; i >= left; i--) {
                ret.add(matrix[bottom][i]);
            }
            bottom--;
            for (int i = bottom; i >= top; i--) {
                ret.add(matrix[i][left]);
            }
            left++;
        }
        return ret;
    }

    public static void main(String[] args) {
        int[][] matrix = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};
        System.out.println(new _54_螺旋矩阵().spiralOrder(matrix));
    }
}
