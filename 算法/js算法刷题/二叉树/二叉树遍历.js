const {
    tree
} = require("./二叉树的基本操作");
/*
                    3
        1                       8
    0      2               5         12
                       null   7             
 */
// 递归
function preOrder(root, arr = []) {
    if (root === null) return;
    arr.push(root.value);
    preOrder(root.left, arr);
    preOrder(root.right, arr);
    return arr;
}
// 循环前序遍历
function preOrder_while(treeRoot) {
    let current = treeRoot;
    const stack = [];
    const result = [];
    while (current || stack.length !== 0) {
        while (current) {
            stack.push(current);
            result.push(current.value);
            current = current.left;
        }
        current = stack.pop().right;
    }
    return result;
}

// 循环中序遍历
function inorderTraversal_while(root) {
    const result = [];
    const stack = [];
    let current = root;
    while (current || stack.length > 0) {
        while (current) {
            stack.push(current);
            current = current.left;
        }
        current = stack.pop();
        result.push(current.value);
        current = current.right;
    }
    return result;
}
//                 3
//         1                       8
//      0      2               5         12
//                         null   7           
// 循环后序遍历
function postorderTraversal_while(root) {
    const result = [];
    const stack = [];
    let prev = null; // 标记上一个访问的节点
    let current = root;
    while (current || stack.length > 0) {
        // 入栈操作
        while (current) {
            stack.push(current);
            current = current.left;
        }
        current = stack[stack.length - 1];
        if (!current.right || current.right === prev) {
            current = stack.pop();
            result.push(current.value);
            prev = current;
            current = null; // 继续弹栈
        } else {
            current = current.right;
        }
    }
    return result;
}

console.log(postorderTraversal_while(tree));