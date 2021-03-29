package 算法刷题.高频题;

// https://leetcode-cn.com/problems/powx-n/
public class _50_Pow {
    public double myPow(double x, int n) {
        if (n == 0) return 1;
        if (n == -1) return 1 / x;
        // 是否为奇数
        boolean old = n % 2 != 0;
        double half = myPow(x, n >> 1);
        half *= half;
        // x = (n < 0) ? 1 / x : x;
        return old ? (half * x) : half;
    }

    public static void main(String[] args) {
        System.out.println(new _50_Pow().myPow(2, -2));
    }
}
