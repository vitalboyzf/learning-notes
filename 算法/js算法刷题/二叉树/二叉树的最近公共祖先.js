const {
    Node
} = require("./二叉树的基本操作");
const A = new Node("A");
const B = new Node("B");
const C = new Node("C");
const D = new Node("D");
const E = new Node("E");
const F = new Node("F");
A.left = B;
A.right = C;
B.left = D;
B.right = E;
C.left = F;
/**
 *            A
 *     B              C
 * D       E      F
 */
function lowestCommonAncestor(root, p, q) {
    if (root === p || root === q || root === null) return root;
    const left = lowestCommonAncestor(root.left, p, q);
    const right = lowestCommonAncestor(root.right, p, q);
    if (left !== null && right !== null) return root;
    return left || right;
}
console.log(lowestCommonAncestor(A, C, F));