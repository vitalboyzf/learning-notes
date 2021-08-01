// 非递归实现
const {
    tree
} = require("./二叉树的基本操作.js");

function kthNode(pRoot, k) {
    const arr = [];
    const stack = [];
    let current = pRoot;
    while (stack.length > 0 || current) {
        while (current) {
            stack.push(current);
            current = current.left;
        }
        current = stack.pop();
        arr.push(current);
        current = current.right;
    }
    if (k > 0 && k <= arr.length) {
        return arr[k - 1];
    }
    return null;
}
console.log(kthNode(tree, 2));