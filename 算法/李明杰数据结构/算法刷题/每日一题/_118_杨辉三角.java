package 算法刷题.每日一题;

import java.util.ArrayList;
import java.util.List;

public class _118_杨辉三角 {
    public List<List<Integer>> generate(int numRows) {
        List<List<Integer>> ret = new ArrayList<>();
        for (int i = 0; i < numRows; i++) {
            List<Integer> row = new ArrayList<>();
            for (int j = 0; j <= i; j++) {
                if (j == 0 || i == j) {
                    row.add(1);
                } else {
                    row.add(ret.get(i - 1).get(j - 1) +
                            ret.get(i - 1).get(j));
                }
            }
            ret.add(row);
        }
        return ret;
    }

    public static void main(String[] args) {
        System.out.println(new _118_杨辉三角().generate(5));
    }
}
