package 算法刷题.排序;

import java.util.Arrays;

public class MyCode {
    public static void swap(int[] arr, int i, int j) {
//        arr[i] = arr[i] ^ arr[j];
//        arr[j] = arr[i] ^ arr[j];
//        arr[i] = arr[i] ^ arr[j];
        int temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }

    // 冒泡排序
    public static void bubbleSort(int[] arr) {
        for (int i = 0; i < arr.length - 1; i++) {
            for (int j = 0; j < arr.length - 1 - i; j++) {
                if (arr[j] > arr[j + 1]) {
                    swap(arr, j, j + 1);
                }
            }
        }
    }

    // 选择排序
    public static void selectSort(int[] arr) {
        for (int i = 0; i < arr.length - 1; i++) {
            int minIndex = i;
            for (int j = i; j < arr.length; j++) {
                if (arr[j] < arr[minIndex]) {
                    minIndex = j;
                }
            }
            swap(arr, minIndex, i);
        }

    }

    // 快速排序辅助函数
    public static void _quickSort(int[] arr, int start, int end) {
        if (start >= end) return;
        int left = start;
        int right = end;
        int key = arr[end];
        while (left < right) {
            while (left < right && arr[left] <= key) left++;
            arr[right] = arr[left];
            while (left < right && arr[right] >= key) right--;
            arr[left] = arr[right];
        }
        arr[left] = key;
        _quickSort(arr, 0, left - 1);
        _quickSort(arr, left + 1, end);
    }

    // 快速排序
    public static void quickSort(int[] arr) {
        _quickSort(arr, 0, arr.length - 1);
    }

    // 插入排序
    public static void insertSort(int[] arr) {
        int j;
        int target;
        for (int i = 1; i < arr.length; i++) {
            // 储存当前需要排序的值
            target = arr[i];
            // j用于扫描前面的值，如果当前值小于前面的值，则当前值前移
            j = i;
            // int target遇到j扫描到0或者当前要插入的值大于扫描的前一个值结束循环
            while (j > 0 && target < arr[j - 1]) {
                // 前一个值赋值给后一个位置
                arr[j] = arr[j - 1];
                // 向左扫描
                j--;
            }
            // 一次扫描结束，将当前需要排序的值赋值给当前扫描的位置
            arr[j] = target;
        }
    }

    public static int[] merge(int[] arr1, int[] arr2) {
        if (arr1.length == 0) return arr2;
        if (arr2.length == 0) return arr1;
        Arrays.sort(arr1);
        Arrays.sort(arr2);
        // 合并后数组的索引指针
        int cur = 0;
        // arr1的索引指针
        int i = 0;
        // arr2的索引指针
        int j = 0;
        int[] res = new int[arr1.length + arr2.length];
        while (i < arr1.length && j < arr2.length) {
            if (arr1[i] > arr2[j]) {
                res[cur] = arr2[j];
                j++;
            } else {
                res[cur] = arr1[i];
                i++;
            }
            cur++;
        }
        while (i < arr1.length) {
            res[cur++] = arr1[i++];
        }
        while (j < arr2.length) {
            res[cur++] = arr2[j++];
        }
        return res;
    }

    // 希尔排序
    public static void mergeSort(int[] arr) {
        int middle = (arr.length - 1) / 2;
    }

    // 希尔排序
    public static void shellSort(int[] arr) {

    }

    public static void main(String[] args) {
        int[] arr = new int[]{2, 4, 6, 0, 3, 1, 7, 9, 8, 5};
//        bubbleSort(arr);
        System.out.println(Arrays.toString(merge(new int[]{2, 4, 6, 0}, new int[]{3, 1, 7, 9, 8, 5})));
//        System.out.println(Arrays.toString(arr));
    }
}
