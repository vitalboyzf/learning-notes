// https://leetcode-cn.com/problems/longest-palindromic-substring/
//  拓展中心法 "babad"
// 获取l+1 => r-1 的长度
function palindrome(str, start, end) {
    while (start >= 0 && end < str.length && str[start] === str[end]) {
        start--;
        end++;
    }
    return (end - 1) - (start + 1) + 1;
}

function longestPalindrome(str) {
    if (str.length < 2) return str;
    if (str.length === 2) return str[0] === str[1] ? str : str[0];
    let max = 0;
    let start = 0;
    for (let i = str.length - 2; i > 0; i--) {
        const curExpand = palindrome(str, i - 1, i + 1);
        const gapExpand = palindrome(str, i, i + 1);
        const maxLen = Math.max(curExpand, gapExpand);
        if (maxLen > max) {
            max = maxLen;
            start = i - Math.floor((maxLen - 1) / 2);
        }
    }
    if (max < 2 && str[0] === str[1]) {
        max = 2;
        start = 0;
    }
    return str.substr(start, max);
}
console.log(longestPalindrome("ffdfd"));