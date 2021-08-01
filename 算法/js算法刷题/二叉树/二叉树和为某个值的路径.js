const {
    tree
} = require("./二叉树的基本操作");

function findPath(root, expectNumber) {
    const result = [];
    if (root) {
        findPathCore(root, expectNumber, [], 0, result);
    }
    return result;
}

function findPathCore(node, expectNumber, stack, sum, result) {
    stack.push(node.value);
    sum += node.value;
    if (!node.left && !node.right && sum === expectNumber) {
        result.push(stack.slice(0));
    }
    if (node.left) {
        findPathCore(node.left, expectNumber, stack, sum, result);
    }
    if (node.right) {
        findPathCore(node.right, expectNumber, stack, sum, result);
    }
    stack.pop();
}
let res = findPath(tree, 6);
console.log(res);