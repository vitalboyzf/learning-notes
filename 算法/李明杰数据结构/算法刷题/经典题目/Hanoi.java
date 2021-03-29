package 算法刷题.经典题目;

// 汉诺塔
public class Hanoi {
    private static void move(int num, String from, String to) {
        System.out.println("将" + num + "号盘子从" + from + "挪到" + to);
    }

    public static void hanoi(int n, String p1, String p2, String p3) {
        if (n == 1) {
            // 将一号盘子从A挪到C
            move(1, p1, p3);
            return;
        }
        // 将n-1个盘子从A挪到B
        hanoi(n - 1, p1, p3, p2);
        // 将n号盘子从A挪到C
        move(n, p1, p3);
        // 将n-1个盘子从B挪到C
        hanoi(n - 1, p2, p1, p3);
    }

    public static void main(String[] args) {
        hanoi(3, "A", "B", "C");
    }
}
