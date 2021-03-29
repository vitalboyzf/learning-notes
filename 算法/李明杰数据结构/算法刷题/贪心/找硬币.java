package 算法刷题.贪心;

import java.util.Arrays;

public class 找硬币 {
    private static int coinChange(int[] faces, int money) {
        Arrays.sort(faces);
        int coins = 0;
        for (int i = faces.length - 1; i >= 0; i--) {
            if (faces[i] > money) {
                continue;
            }
            System.out.println("第" + ++coins + "次找零：" + faces[i] + "元");
            money -= faces[i];
            i = faces.length;
        }
        return coins;
    }

    public static void main(String[] args) {
        int[] faces = new int[]{25, 1, 5, 10};
        System.out.println(coinChange(faces, 61));
    }
}
