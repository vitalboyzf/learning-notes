package 算法刷题.数组;

import java.util.Arrays;

/*
 * 面试题 16.16. 部分排序
 * https://leetcode-cn.com/problems/sub-sort-lcci/
 * */
public class _16_16_ {
    public static int[] subSort(int[] array) {
        if (array.length == 0) {
            return new int[]{-1, -1};
        }
        // 从左向右扫描
        int max = array[0];
        int r = -1;
        for (int i = 1; i < array.length; i++) {
            if (array[i] >= max) {
                // 更新max
                max = array[i];
            } else {
                // 更新最大逆序对索引
                r = i;
            }
        }
        // 无逆序对，不需要继续扫描
        if (r == -1) {
            return new int[]{-1, -1};
        }
        // 从右向左扫描
        int min = array[array.length - 1];
        int l = -1;
        for (int i = array.length - 2; i >= 0; i--) {
            if (array[i] <= min) {
                // 更新min
                min = array[i];
            } else {
                // 更新最小逆序对位置索引
                l = i;
            }
        }
        return new int[]{l, r};
    }

    public static void main(String[] args) {
        int[] arr = {1, 2, 4, 7, 10, 11, 7, 12, 6, 7, 16, 18, 19};
        System.out.println(Arrays.toString(subSort(arr)));
    }
}
