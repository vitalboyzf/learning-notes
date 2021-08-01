// 重点 polyfill
// 通过滑动窗口
function lengthOfLongestSubstring(str) {
    const map = new Map();
    let start = -1;
    let res = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str[i];
        if (map.has(char)) {
            start = Math.max(start, map.get(char));
        }
        res = Math.max(res, i - start);
        map.set(char, i);
    }
    return res;
}
const res = lengthOfLongestSubstring("abuba");
console.log(res);