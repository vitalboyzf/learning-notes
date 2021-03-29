package 算法刷题.高频题;

import java.util.Arrays;
import java.util.Comparator;

// VIP题库
public class _252_会议室 {
    public boolean canAttendMeetings(int[][] intervals) {
        if (intervals == null || intervals.length == 0) return true;
        Arrays.sort(intervals, Comparator.comparingInt(a -> a[0]));
        for (int i = 1; i < intervals.length; i++) {
            if (intervals[i][0] < intervals[i - 1][1]) return false;
        }
        return true;
    }

    public static void main(String[] args) {
        System.out.println(new _252_会议室().canAttendMeetings(new int[][]
                {
                        {0, 4},
                        {5, 10},
                        {15, 20}
                }
        ));
    }
}
