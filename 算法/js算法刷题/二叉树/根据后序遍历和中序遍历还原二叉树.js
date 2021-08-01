import {
    Node
} from "./tree.mjs";
const postOrderTraversal = ["F", "G", "C", "D", "E", "B", "A"];
const middleOrderTraversal = ["F", "C", "G", "A", "D", "B", "E"];

function restoreBinaryTree(postOrderTraversal, middleOrderTraversal) {
    if (
        postOrderTraversal === null ||
        middleOrderTraversal === null ||
        postOrderTraversal.length === 0 ||
        middleOrderTraversal.length === 0 ||
        postOrderTraversal.length !== middleOrderTraversal.length) return null;
    const treeNode = new Node(postOrderTraversal[postOrderTraversal.length - 1]);
    const middleIndex = middleOrderTraversal.indexOf(treeNode.val);
    const postLeft = postOrderTraversal.slice(0, middleIndex);
    const postRight = postOrderTraversal.slice(middleIndex, postOrderTraversal.length - 1);
    const middleLeft = middleOrderTraversal.slice(0, middleIndex);
    const middleRight = middleOrderTraversal.slice(middleIndex + 1, middleOrderTraversal.length);
    treeNode.left = restoreBinaryTree(postLeft, middleLeft);
    treeNode.right = restoreBinaryTree(postRight, middleRight);
    return treeNode;
}
const tree = restoreBinaryTree(postOrderTraversal, middleOrderTraversal);
console.log(tree);