package 算法刷题.每日一题;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class _448_找出所有数组中消失的数字 {
    public List<Integer> findDisappearedNumbers(int[] nums) {
        for (int num : nums) {
            int x = (num - 1) % nums.length;
            nums[x] += nums.length;
        }
        List<Integer> ret = new ArrayList<Integer>();
        for (int i = 0; i < nums.length; i++) {
            if (nums[i] <= nums.length) {
                ret.add(i + 1);
            }
        }
        return ret;
    }

    public static void main(String[] args) {
        System.out.println(new _448_找出所有数组中消失的数字().findDisappearedNumbers(new int[]{2, 5, 1, 3, 3}));
    }
}
