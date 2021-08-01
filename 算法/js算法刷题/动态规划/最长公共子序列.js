const longestCommonSubsequence = function (text1, text2) {
    let m = text1.length,
        n = text2.length;
    // 生成dp数组
    /*
       [
            [ 0, 0, 0, 0 ],
            [ 0, 1, 1, 1 ],
            [ 0, 1, 1, 1 ],
            [ 0, 1, 2, 2 ],
            [ 0, 1, 2, 2 ],
            [ 0, 1, 2, 3 ]
       ]
     */
    const dp = new Array(m + 1).fill(0).map(() => new Array(n + 1).fill(0));
    for (let i = 1; i <= m; i++) {
        let curM = text1.charAt(i - 1);
        for (let j = 1; j <= n; j++) {
            let curN = text2.charAt(j - 1);
            if (curM === curN) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }
    console.log(dp);
    return dp[m][n];
};
console.log(longestCommonSubsequence("abcde", "ace"));