package 算法刷题.高频题;
// 公式：f(n,m) = (f(n-1,m)+m)%n
public class 面试题62圆圈中最后剩下的数字 {
    public int lastRemaining(int n, int m) {
        if (n == 1) return 0;
        return (lastRemaining(n - 1, m) + m) % n;
    }

    public static void main(String[] args) {
        System.out.println(new 面试题62圆圈中最后剩下的数字().lastRemaining(5, 3));
    }
}
