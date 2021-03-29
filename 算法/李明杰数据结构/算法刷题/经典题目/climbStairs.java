package 算法刷题.经典题目;

// 爬楼梯，有n节楼梯，每次只能爬一节或者爬两节，有多少种爬法
public class climbStairs {
    public static int climb(int n) {
        if (n < 0) return 0;
        if (n <= 2) return n;
        return climb(n - 1) + climb(n - 2);
    }

    public static void main(String[] args) {
        System.out.println(climb(5));
    }
}
