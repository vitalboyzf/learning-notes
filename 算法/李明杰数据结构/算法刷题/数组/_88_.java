package 算法刷题.数组;

import java.util.Arrays;

/**
 * 合并两个有序数组
 * https://leetcode-cn.com/problems/merge-sorted-array/
 */
public class _88_ {
    public static void merge(int[] nums1, int m, int[] nums2, int n) {
        int i = m - 1;// nums1的最后一个有效数字索引
        int j = n - 1;// nums2的最后一位索引
        int cur = nums1.length - 1;//当前赋值下标
        while (j >= 0) {
            // 如果i大于零，并且i位置的值大于j位置的值
            if (i >= 0 && nums1[i] > nums2[j]) {
                // 用nums1赋值
                nums1[cur--] = nums1[i--];
            } else {
                nums1[cur--] = nums2[j--];
            }
        }
    }

    public static void main(String[] args) {
        int[] arr1 = {1, 2, 3, 0, 0, 0};
        int[] arr2 = {2, 5, 6};
        merge(arr1, 3, arr2, 3);
        System.out.println(Arrays.toString(arr1));
    }
}
