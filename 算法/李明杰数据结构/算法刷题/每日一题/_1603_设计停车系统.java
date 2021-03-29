package 算法刷题.每日一题;

// https://leetcode-cn.com/problems/design-parking-system/
public class _1603_设计停车系统 {
    private int big, medium, small;

    public _1603_设计停车系统(int big, int medium, int small) {
        this.big = big;
        this.medium = medium;
        this.small = small;
    }

    public boolean addCar(int carType) {
        switch (carType) {
            case 1:
                return this.big-- > 0;
            case 2:
                return this.medium-- > 0;
            case 3:
                return this.small-- > 0;
        }
        throw new Error("carType must be 1,2,3");
    }

    public static void main(String[] args) {
        _1603_设计停车系统 parkingSystem = new _1603_设计停车系统(1, 1, 0);
        System.out.println(parkingSystem.addCar(1));
        System.out.println(parkingSystem.addCar(2));
        System.out.println(parkingSystem.addCar(3));
        System.out.println(parkingSystem.addCar(1));
    }
}
