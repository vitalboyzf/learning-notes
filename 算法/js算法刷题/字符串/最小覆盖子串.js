function minWindow(s, t) {
    let need = {}, // t中每个字符出现的个数：{ A: 1, B: 1, C: 1 }
        window = {};
    for (let c of t) {
        if (!need[c]) need[c] = 1;
        else need[c]++;
    }
    let left = 0,
        right = 0;
    let valid = 0,
        len = Object.keys(need).length;
    let minLen = s.length + 1,
        minStr = "";
    while (right < s.length) {
        const d = s[right];
        right++;
        if (!window[d]) window[d] = 1;
        else window[d]++;
        if (need[d] && need[d] === window[d]) {
            valid++;
        }
        while (valid === len) {
            if (right - left < minLen) {
                minLen = right - left;
                minStr = s.slice(left, right);
            }
            let c = s[left];
            left++;
            window[c]--;
            if (need[c] && window[c] < need[c]) {
                valid--;
            }
        }
    }
    return minStr;
}
const s = "ADOBECODEBANC",
    t = "ABC";
console.log(minWindow(s, t));