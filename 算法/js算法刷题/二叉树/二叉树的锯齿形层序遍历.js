// https://leetcode-cn.com/problems/binary-tree-zigzag-level-order-traversal/
/**
 * @param {TreeNode} nodeList
 * @return {number[][]}
 */
const zigzagLevelOrder = function (root) {
    if (!root) return [];
    let isOrderLeft = true;
    let queue = []; // 队列
    let ret = [];
    queue.push(root); // 开始搜索
    while (queue.length) {
        let size = queue.length; // 这次循环的队列size
        let curPath = [];
        for (let i = 0; i < size; i++) {
            let cur = queue.shift();
            if (isOrderLeft) {
                curPath.push(cur.val);
            } else {
                curPath.unshift(cur.val);
            }
            // 下一层入队
            cur.left && queue.push(cur.left);
            cur.right && queue.push(cur.right);
        }
        ret.push(curPath);
        isOrderLeft = !isOrderLeft;
    }
    return ret;
};