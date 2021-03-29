package 算法刷题.数组;

import java.util.Arrays;

/*
颜色的分类
https://leetcode-cn.com/problems/sort-colors/
[2,0,2,1,1,0] => [0,0,1,1,2,2]
解题思路：
       1. 使用三指针，第一个指向0，第二个指向当前扫描位置，第三个指向2(第一个指针可能为2)
       2. 扫描遇到2，和第三个指针交换值，第三个指针前移一位
       3. 扫描遇到0，和第一个指针交换值，第一个指针后移一位，当前扫描指针后移一位
       4. 扫描遇到1，扫描指针后移一位
       5. 当cur>last的时候，结束循环
          c
        l r
       [1,0,2]
* */
public class _75_ {
    private static void swap(int[] arr, int i, int j) {
        int temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }

    public static void sortColors(int[] nums) {
        int first = 0;
        int cur = 0;
        int last = nums.length - 1;

        while (cur <= last) {
            int element = nums[cur];
            if (element == 0) {
                swap(nums, cur, first);
                cur++;
                first++;
            } else if (element == 1) {
                cur++;
            } else {
                swap(nums, cur, last);
                last--;
            }
        }
    }

    public static void main(String[] args) {
        int[] arr = {0, 1, 0, 0, 2, 2};
        sortColors(arr);
        System.out.println(Arrays.toString(arr));
    }
}
