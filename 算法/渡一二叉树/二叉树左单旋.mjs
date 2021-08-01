import { isBalance, getDeep } from "./二叉搜索树.mjs";
import { Dan2 } from "./tree.mjs";
function leftRotate(root) {
    // 找到新的根
    const newRoot = root.right;
    // 找到变化分支
    const changeTree = root.right.left;
    // 当前旋转节点的右孩子为变化分支
    root.right = changeTree;
    // 新根左孩子为旋转节点
    newRoot.left = root;
    // 返回新的节点
    return newRoot;
}
function rightRotate(root) {
    // 找到新根
    const newRoot = root.left;
    // 找到变化分支
    const changeTree = root.left.right;
    // 当前旋转节点的左孩子为变化分支
    root.left = changeTree;
    // 新根右孩子为旋转节点
    newRoot.right = root;
    // 返回新节点
    return newRoot;
}
function change(root) {
    if (isBalance(root)) return root;
    if (root.left !== null) change(root.left);
    if (root.right !== null) change(root.right);
    const leftDeep = getDeep(root.left);
    const rightDeep = getDeep(root.right);
    if (Math.abs(leftDeep - rightDeep) < 2) {
        return true;
    } else if (leftDeep > rightDeep) { // 不平衡，左边深，需要右旋
        return rightRotate(root);
    } else { // 不平衡，右边深，需要左旋
        return leftRotate(root);
    }
}
console.log(isBalance(Dan2));
let newRoot = change(Dan2);
console.log(isBalance(newRoot));
console.log(newRoot);