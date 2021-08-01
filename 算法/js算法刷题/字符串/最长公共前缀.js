function longestCommonPrefix(strArr) {
    let ret = "";
    if (!strArr.length) return ret;
    for (let i = 0; i < strArr[0].length; i++) {
        for (let j = 1; j < strArr.length; j++) {
            if (strArr[0][i] !== strArr[j][i]) {
                return ret;
            }
        }
        ret += strArr[0][i];
    }
    return ret;
}
console.log(longestCommonPrefix(["flower", "flow", "flight"]));