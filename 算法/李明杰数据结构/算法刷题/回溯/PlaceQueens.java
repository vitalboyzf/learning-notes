package 算法刷题.回溯;

// n皇后摆放
public class PlaceQueens {
    int[] cols;
    int ways;

    private void show() {
        // 第row行第几个元素是皇后
        for (int row : cols) {
            for (int col = 0; col < cols.length; col++) {
                // 是皇后的位置打印1，不是皇后的位置打印0
                if (row == col) {
                    System.out.print(" *");
                } else {
                    System.out.print(" #");
                }
            }
            System.out.println();
        }
        System.out.println("--------------------");
    }

    // 校验row行，col列是否可以摆放
    private boolean isValid(int row, int col) {
        for (int i = 0; i < row; i++) {
            // 判断上下合法性 （第i行皇后位置是否在当前列）
            if (cols[i] == col) return false;
            // 判断斜线合法性
            if (row - i == Math.abs(col - cols[i])) return false;
        }
        return true;
    }

    private void place(int row) {
        // 成功摆放所有，方法加一，展示
        if (row == cols.length) {
            ways++;
            show();
            return;
        }
        for (int col = 0; col < cols.length; col++) {
            if (isValid(row, col)) {
                // 第row行，第col列摆放皇后
                cols[row] = col;
                place(row + 1);
            }
        }
    }

    public void placeQueens(int n) {
        if (n < 1) return;
        cols = new int[n];
        place(0);
        System.out.println(n + "皇后一共有" + ways + "次摆法");
    }


    public static void main(String[] args) {
        new PlaceQueens().placeQueens(4);
    }
}
