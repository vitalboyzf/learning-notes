package 算法刷题.高频题;

import java.util.Arrays;
import java.util.Comparator;
import java.util.PriorityQueue;
// VIP题库
public class _253_会议室II {
    // 分开排序
    public int minMeetingRooms(int[][] intervals) {
        if (intervals == null || intervals.length == 0) return 0;
        int[] starts = new int[intervals.length];
        int[] ends = new int[intervals.length];
        for (int i = 0; i < intervals.length; i++) {
            starts[i] = intervals[i][0];
            ends[i] = intervals[i][1];
        }
        Arrays.sort(starts);
        Arrays.sort(ends);
        int rooms = 0;
        int endIdx = 0;
        for (int start : starts) {
            if (start >= ends[endIdx]) {
                endIdx++;
            } else {
                rooms++;
            }
        }
        return rooms;
    }

    public int minMeetingRooms1(int[][] intervals) {
        if (intervals == null || intervals.length == 0) return 0;
        Arrays.sort(intervals, Comparator.comparingInt(a -> a[0]));
        PriorityQueue<Integer> heap = new PriorityQueue<>();
        heap.add(intervals[0][1]);
        for (int interval = 1; interval < intervals.length; interval++) {
            // 已经有结束的了
            if (intervals[interval][0] >= heap.peek()) {
                // 删除结束的
                heap.remove();
            }
            // 添加一个新的会议的结束时间
            heap.add((intervals[interval][1]));
        }
        return heap.size();
    }

    public static void main(String[] args) {
        System.out.println(new _253_会议室II().minMeetingRooms(new int[][]{{1, 6}, {5, 6}}));
    }
}
