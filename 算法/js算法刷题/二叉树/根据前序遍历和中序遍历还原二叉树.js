const {
    Node
} = require("./二叉树的基本操作");

const preOrderTraversal = ["A", "C", "F", "G", "B", "D", "E"];
const middleOrderTraversal = ["F", "C", "G", "A", "D", "B", "E"];

function restoreBinaryTree(preOrderTraversal, middleOrderTraversal) {
    if (
        preOrderTraversal === null ||
        middleOrderTraversal === null ||
        preOrderTraversal.length === 0 ||
        middleOrderTraversal.length === 0 ||
        preOrderTraversal.length !== middleOrderTraversal.length) return null;
    const treeNode = new Node(preOrderTraversal[0]);
    const middleIndex = middleOrderTraversal.indexOf(preOrderTraversal[0]);
    const preLeft = preOrderTraversal.slice(1, middleIndex + 1);
    const preRight = preOrderTraversal.slice(middleIndex + 1, preOrderTraversal.length);
    const middleLeft = middleOrderTraversal.slice(0, middleIndex);
    const middleRight = middleOrderTraversal.slice(middleIndex + 1, middleOrderTraversal.length);
    treeNode.left = restoreBinaryTree(preLeft, middleLeft);
    treeNode.right = restoreBinaryTree(preRight, middleRight);
    return treeNode;
}
const tree = restoreBinaryTree(preOrderTraversal, middleOrderTraversal);
console.log(tree);