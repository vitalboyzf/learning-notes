package 算法刷题.动态规划;
/*
* 编辑距离
* https://leetcode-cn.com/problems/edit-distance/
* */
public class _72_ {
    public static int minDistance(String word1, String word2) {
        if (word1 == null || word2 == null) return 0;
        // 将字符串转化为字符数组
        char[] cs1 = word1.toCharArray();
        char[] cs2 = word2.toCharArray();
        // 初始化dp数组 dp[i][j]表示 从cs1[0,i)转化为cs2[0,j)的操作数
        int[][] dp = new int[cs1.length + 1][cs2.length + 1];
        // 由空字符转化为空字符操作数为0
        dp[0][0] = 0;
        // 第0列，操作数为将几个有效字符转化为空字符 （有几个字符操作数就是几）
        for (int i = 1; i <= cs1.length; i++) {
            dp[i][0] = i;
        }
        // 第0行 操作数为将空字符转化为几个有效字符（有几个字符操作数就是几）
        for (int j = 1; j <= cs2.length; j++) {
            dp[0][j] = j;
        }
        // 其它行列 遍历dp二维数组
        for (int i = 1; i < dp.length; i++) {
            for (int j = 1; j < dp[0].length; j++) {
                // 第一种情况，先删除cs1[0,i]的最后一个字符转化为cs1[0,i-1]
                // 再将cs1[0,i-1]转化为cs2[0,j]
                // 所以dp[i][j] = 1 + dp[i-1][j];
                int top = dp[i - 1][j] + 1;
                // 第二种情况，先将cs1[0,i]转化为cs2[0,j-1];
                // 再将最后一个字符s2[j-1]插入
                // 所以dp[i][j] = dp[i][j-1] + 1
                int left = dp[i][j - 1] + 1;
                // 第三种情况，cs1和cs2最后一个字符相同,最后一个字符不需要转换
                // dp[i][j] = dp[i - 1][j - 1]
                // 第四种情况，cs1和cs2的最后一个字符不相同，需要转化最后一个字符
                // 先由cs1[0,i-1)转换为cs2[0,j-1)
                // 然后由cs2[j-1]替换cs1[i-1]
                // 这种情况 dp[i][j] = dp[i-1][j-1]+1
                int leftTop = dp[i - 1][j - 1];
                // 如果是最后一种情况，需要加上一步替换操作
                if (cs1[i - 1] != cs2[j - 1]) {
                    leftTop++;
                }
                // dp[i][j]为三种情况中最小的值
                dp[i][j] = Math.min(Math.min(top, left), leftTop);
            }
        }
        /* dp result
          0 , 1 , 2 , 3 ,
          1 , 1 , 2 , 3 ,
          2 , 2 , 1 , 2 ,
          3 , 2 , 2 , 2 ,
          4 , 3 , 3 , 2 ,
          5 , 4 , 4 , 3 ,
        */
        return dp[cs1.length][cs2.length];
    }

    public static void main(String[] args) {
        System.out.println(minDistance("horse", "ros"));
    }
}
