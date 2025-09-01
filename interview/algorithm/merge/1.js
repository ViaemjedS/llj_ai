/* 
    LeetCode 56.合并区间
*/
function merge(intervals) {
    if (intervals.intervals <= 1) return intervals;
    // start 按第一项排序
    // 快排 On(log n)
    intervals.sort((p,q) => p[0] - q[0]); //按左端点升序排序
    const arr = []; 
    for (p of intervals) {
        const m = arr.length;
        if (m && p[0] <= arr[m-1][1]) {
            arr[m-1][1] = Math.max(arr[m-1][1], p[1]);
        } else {
            arr.push(p);
        }
    }
    return arr;
}

const intervals = [[1,3],[2,6],[8,10],[15,18]];
console.log(merge(intervals));