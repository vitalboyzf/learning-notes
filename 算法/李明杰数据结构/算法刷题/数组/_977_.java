package 算法刷题.数组;

import java.util.Arrays;

/*
 * 有效数组的平方
 * */
public class _977_ {
    public static int[] sortedSquares(int[] arr) {
        // 用于存储结果的新数组
        int[] resArr = new int[arr.length];
        int left = 0;
        int right = arr.length - 1;
        int cur = arr.length - 1;
        while (left <= right) {
            int powI = arr[left] * arr[left];
            int powJ = arr[right] * arr[right];
            if (powI > powJ) {
                resArr[cur--] = powI;
                left++;
            } else {
                resArr[cur--] = powJ;
                right--;
            }
        }
        return resArr;
    }

    public static void main(String[] args) {
        int[] arr = new int[]{-7, -3, 2, 3, 11};
        System.out.println(Arrays.toString(sortedSquares(arr)));
    }
}
