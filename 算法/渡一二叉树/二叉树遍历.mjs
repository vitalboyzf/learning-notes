import {
    A
} from "./tree.mjs";
// 前序：[A,C,F,G,B,D,E]
// 中序：[F,C,G,A,D,B,E]
// 后序：[F,G,C,D,E,B,A]

// 前序优先遍历
function preOrderTraversal(head) {
    if (head === null) return null;
    console.log(head.val);
    preOrderTraversal(head.left);
    preOrderTraversal(head.right);
}
// 中序优先遍历
function middleOrderTraversal(head) {
    if (head === null) return null;
    middleOrderTraversal(head.left);
    console.log(head.val);
    middleOrderTraversal(head.right);
}
// 后序优先遍历
function postOrderTraversal(head) {
    if (head === null) return null;
    postOrderTraversal(head.left);
    postOrderTraversal(head.right);
    console.log(head.val);
}