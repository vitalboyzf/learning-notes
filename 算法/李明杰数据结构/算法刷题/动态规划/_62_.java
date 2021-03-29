package 算法刷题.动态规划;

/*
 * 不同路径
 * https://leetcode-cn.com/problems/unique-paths/
 * */
public class _62_ {
    public static int uniquePaths(int rows, int cols) {
        if (rows < 1 || cols < 1) return 0;
        // rows是行数，cols是列数
        int[][] dp = new int[rows][cols];
        for (int row = 0; row < rows; row++) {
            dp[row][0] = 1;
        }
        for (int col = 0; col < cols; col++) {
            dp[0][col] = 1;
        }
        for (int row = 1; row < rows; row++) {
            for (int col = 1; col < cols; col++) {
                dp[row][col] = dp[row - 1][col] + dp[row][col - 1];
            }
        }

        return dp[rows - 1][cols - 1];
    }

    public static void main(String[] args) {
//        for (int row = 0; row < rows; row++) {
//            for (int col = 0; col < cols; col++) {
//                System.out.print(dp[row][col] + " , ");
//            }
//            System.out.println("");
//        }
        System.out.println(uniquePaths(0, 7));
    }
}
