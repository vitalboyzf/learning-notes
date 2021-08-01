import {
    A
} from "./tree.mjs";
// 对于二叉树来说，深度优先搜索和二叉树前序遍历的顺序是一样的
function deepSearch(head, target) {
    if (head === null) return false;
    if (target === head.val) return true;
    const leftSearch = deepSearch(head.left, target);
    const rightSearch = deepSearch(head.right, target);
    return leftSearch || rightSearch;
}
const result = deepSearch(A, "E");
console.log(result);