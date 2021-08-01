function canAttendMeetings(intervals) {
    if (intervals === null || intervals.length === 0) return true;
    // 按照会议的开始时间，从小到大排序
    intervals.sort((m1, m2) => m1[0] - m2[0]);
    // 遍历每一个会议
    for (let i = 1; i < intervals.length; i++) {
        if (intervals[i][0] < intervals[i - 1][1]) return false;
    }
    return true;
}
console.log(canAttendMeetings([
    [2, 6],
    [5, 9]
]));