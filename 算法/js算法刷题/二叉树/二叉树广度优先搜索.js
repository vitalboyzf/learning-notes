const {
    tree
} = require("./二叉树的基本操作");
/*
                    3
        1                       8
    0      2               5         12
                       null   7             
 */
// 广度优先遍历
function breadThFirst(rootList, result = []) {
    if (rootList.length === 0) return;
    let list = [];
    if (!Array.isArray(rootList)) rootList = [rootList];
    for (let i = 0; i < rootList.length; i++) {
        const node = rootList[i];
        if (!node) continue;
        result.push(node.value);
        list.push(node.left);
        list.push(node.right);
    }
    breadThFirst(list, result);
    return result;
}
console.log(breadThFirst(tree));

function breadthFirstSearch(rootList, target) {
    if (!Array.isArray(rootList)) {
        rootList = [rootList];
    }
    if (rootList === null || rootList.length === 0) return false;
    // 盛放下一层节点的数组
    const childList = [];
    // 遍历当前层节点的数组
    for (let i = 0; i < rootList.length; i++) {
        // 如果当前节点值为null，结束本次循环
        if (rootList[i] === null) continue;
        // 如果当前节点的值等于目标值，返回true
        if (rootList[i].value === target) {
            return true;
        }
        // 当前节点不等于目标值，将当前节点的左节点和右节点添加到下一次需要遍历的节点数组
        else {
            childList.push(rootList[i].left);
            childList.push(rootList[i].right);
        }
    }
    // 遍历下一层节点
    return breadthFirstSearch(childList, target);
}
// const result = breadthFirstSearch(A, "D");
// console.log(result);