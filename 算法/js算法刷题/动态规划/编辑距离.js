/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
const minDistance = function (word1, word2) {
    const dp = new Array(word1.length + 1).fill(0).map(el => new Array(word2.length + 1).fill(0));
    // 第0列
    for (let row = 1; row <= word1.length; row++) {
        dp[row][0] = row;
    }
    // 第0行
    for (let col = 1; col <= word2.length; col++) {
        dp[0][col] = col;
    }
    /*
        ''  r  o  s
    '' [ 0, 1, 2, 3 ]
     h [ 1, 1, 2, 3 ]
     o [ 2, 2, 1, 2 ]
     r [ 3, 2, 2, 2 ]
     s [ 4, 3, 3, 2 ]
     e [ 5, 4, 4, 3 ]
     */
    // 其它行列
    // a字符串转化为b字符串对每个字符进行对比
    // 可以进行的操作有删除第一个字符串的字符，删除第二个字符串的字符，替换
    for (let row = 1; row <= word1.length; row++) {
        for (let col = 1; col <= word2.length; col++) {
            // 删除word1的字符
            let top = dp[row - 1][col] + 1;
            // 删除word2的字符
            let left = dp[row][col - 1] + 1;
            // 修改操作
            let leftTop = dp[row - 1][col - 1];
            // 如果当前不同，增加一步修改操作
            if (word1[row - 1] !== word2[col - 1]) {
                leftTop++;
            }
            dp[row][col] = Math.min(Math.min(top, left), leftTop);
        }
    }
    return dp[word1.length][word2.length];
};
const word1 = "horse",
    word2 = "ros";
console.log(minDistance(word1, word2));