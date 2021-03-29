import { A, A1 } from "./tree.mjs";
function compareTree(root1, root2) {
    if (root1 === root2) return true;
    if (root1 === null && root2 !== null) return false;
    if (root2 === null && root1 !== null) return false;
    if (root1.val !== root2.val) {
        return false;
    }
    const booleanLeft = compareTree(root1.left, root2.left);
    const booleanRight = compareTree(root1.right, root2.right);
    return booleanLeft && booleanRight;
}
function compareReverseTree(root1, root2) {
    if (root1 === root2) return true;
    if (root1 === null && root2 !== null) return false;
    if (root2 === null && root1 !== null) return false;
    if (root1.val !== root2.val) {
        return false;
    }
    return (compareTree(root1.left, root2.left) && compareTree(root1.right, root2.right)) ||
        (compareTree(root1.left, root2.right) && compareTree(root1.right, root2.left));
}
console.log(compareTree(A, A1));