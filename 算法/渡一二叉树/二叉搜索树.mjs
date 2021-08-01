import {
    Node,
    A,
    P1
} from "./tree.mjs";
// 添加节点
function addNode(root, num) {
    if (root === null) return;
    if (root.val === num) return;
    if (root.val < num) {
        if (root.right === null) root.right = new Node(num);
        else addNode(root.right, num);
    } else {
        if (root.left === null) root.left = new Node(num);
        else addNode(root.left, num);
    }
}
// 构建二叉搜索树
function buildSearchTree(arr) {
    if (!arr || arr.length === 0) return null;
    const root = new Node(arr[0]);
    for (let i = 1; i < arr.length; i++) {
        addNode(root, arr[i]);
    }
    return root;
}
// 利用二叉搜索树查询目标数字
function searchByTree(root, target) {
    if (root === null) return false;
    if (root.val === target) return true;
    if (target > root.val) {
        return searchByTree(root.right, target);
    } else {
        return searchByTree(root.left, target);
    }
}
// 获取二叉树深度
export function getDeep(root) {
    if (root === null) return 0;
    const leftDeep = getDeep(root.left);
    const rightDeep = getDeep(root.right);
    return Math.max(leftDeep, rightDeep) + 1;
}
// 判断是否为平衡二叉树
export function isBalance(root) {
    if (root === null) return true;
    const leftDeep = getDeep(root.left);
    const rightDeep = getDeep(root.right);
    if (Math.abs(leftDeep - rightDeep) > 1) {
        // 高度差超过1，不满足平衡二叉树
        return false;
    } else {
        // 当前层满足平衡二叉树，继续查看其它层
        return isBalance(root.left) && isBalance(root.right);
    }
}
const arr = [4, 8, 9, 2, 5, 0, 6, 1];
const root = buildSearchTree(arr);
console.log(root);
// console.log(searchByTree(root, 7));
// console.log(getDeep(A));
// console.log(isBalance(P1));