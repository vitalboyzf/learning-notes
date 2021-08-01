function ladderLength(beginWord, endWord, wordList) {
    // 队列queue中存储当前步伐所能对应的字符串
    let queue = [beginWord];
    // 初始化为1步	
    let count = 1;
    while (queue.length) {
        // 步数，当前队列的个数
        let tmp = queue.length;
        // 步数加1
        count++;
        // 如果队列有值，就执行这个函数
        while (tmp--) {
            // 从队头拿出一个字符串now
            let now = queue.shift();
            for (let i = 0; i < wordList.length; i++) {
                // 判断wordList中是否有该字符串转一个字符可以变成的字符串
                if (checkTwoStr(now, wordList[i])) {
                    // 如果直接能得到endWord则返回步数
                    if (wordList[i] === endWord) {
                        return count;
                    }
                    // 否则，queue中新增能到达的字符
                    queue.push(wordList[i]);
                    // 已知，所需要的最短的步数是不可能走回头路的，所以把走过的wordList[i]直接置空，防止重走
                    wordList[i] = "";
                }
            }
        }
    }
    return 0;
}
// str1是否能变化一个字符转化为str2
function checkTwoStr(str1, str2) {
    if (!str1 || !str2 || str1.length !== str2.length) {
        return false;
    }
    let result = false;
    for (let i = 0; i < str1.length; i++) {
        if (str1[i] !== str2[i]) {
            if (!result) {
                result = true;
            } else {
                return false;
            }
        }
    }
    return result;
}
console.log(ladderLength("hit", "cog", ["hot", "dot", "dog", "lot", "log", "cog"]));