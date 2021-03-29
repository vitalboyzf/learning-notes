package 算法刷题.每日一题;

import java.util.ArrayList;
import java.util.List;

// https://leetcode-cn.com/problems/pascals-triangle-ii/
public class _119_杨辉三角II {
    // 进一步优化
    public List<Integer> getRow(int rowIndex) {
        List<Integer> row = new ArrayList<Integer>();
        row.add(1);
        for (int i = 1; i <= rowIndex; ++i) {
            row.add(0);
            for (int j = i; j > 0; --j) {
                row.set(j, row.get(j) + row.get(j - 1));
            }
        }
        return row;
    }

    // 优化
    public List<Integer> getRow1(int rowIndex) {
        List<Integer> pre = new ArrayList<Integer>();
        for (int i = 0; i <= rowIndex; ++i) {
            List<Integer> cur = new ArrayList<Integer>();
            for (int j = 0; j <= i; ++j) {
                if (j == 0 || j == i) {
                    cur.add(1);
                } else {
                    cur.add(pre.get(j - 1) + pre.get(j));
                }
            }
            pre = cur;
        }
        return pre;
    }

    // 常规解法
    public List<Integer> getRow2(int rowIndex) {
        List<List<Integer>> triangle = new ArrayList<>();
        for (int i = 0; i <= rowIndex; i++) {
            List<Integer> row = new ArrayList<>();
            for (int j = 0; j <= i; j++) {
                if (j == 0 || i == j) {
                    row.add(1);
                } else {
                    row.add(triangle.get(i - 1).get(j - 1)
                            + triangle.get(i - 1).get(j));
                }
            }
            triangle.add(row);
        }
        return triangle.get(rowIndex);
    }

    public static void main(String[] args) {
        System.out.println(new _119_杨辉三角II().getRow(5));
    }
}
