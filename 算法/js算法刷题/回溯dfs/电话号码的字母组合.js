// https://leetcode-cn.com/problems/letter-combinations-of-a-phone-number/
const lettersArray = [
    ["a", "b", "c"],
    ["d", "e", "f"],
    ["g", "h", "i"],
    ["j", "k", "l"],
    ["m", "n", "o"],
    ["p", "q", "r", "s"],
    ["t", "u", "v"],
    ["w", "x", "y", "z"]
];

function letterCombinations(digits) {
    if (digits === null) return null;
    const ret = [];
    const path = new Array(digits.length);
    const charsDigits = digits.split("");
    if (charsDigits.length === 0) return ret;
    dfs(0, ret, path, charsDigits);
    return ret;
}

function dfs(idx, ret, path, charsDigits) {
    if (idx === path.length) {
        ret.push(path.toString().replace(/,/g, ""));
        return;
    }
    // 去映射表中取出对应的字符数组
    const letters = lettersArray[charsDigits[idx] - "2"];
    letters.forEach(letter => {
        path[idx] = letter;
        dfs(idx + 1, ret, path, charsDigits);
    });
}
console.log(letterCombinations("23"));