// 给出一个会议时间数组，返回最少所需会议室数量
function minMeetingRooms(intervals) {
    // 开始时间数组
    const begins = new Array(intervals.length);
    // 结束时间数组
    const ends = new Array(intervals.length);
    for (let i = 0; i < intervals.length; i++) {
        begins[i] = intervals[i][0];
        ends[i] = intervals[i][1];
    }

    // 进行排序
    begins.sort((a, b) => a - b);
    ends.sort((a, b) => a - b);
    let room = 0,
        endIdx = 0;
    begins.forEach(begin => {
        // 如果存在begin>=ends中的某一项，说明存在一个会议已经结束，另一个会议开始的复用情况
        if (begin >= ends[endIdx]) {
            endIdx++;
        } else {
            room++;
        }
    });
    return room;
}
console.log(minMeetingRooms([
    [0, 30],
    [5, 10],
    [15, 20]
]));