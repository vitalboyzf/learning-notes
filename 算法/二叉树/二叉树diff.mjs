import { A, A1 } from "./tree.mjs";

function diffTree(node1, node2) {
    if (node1 === node2) return [];
    const diffList = [];
    if (node1 === null && node2 !== null) {
        // 新增节点
        diffList.push({ type: "新增", origin: null, now: node2 });
    } else if (node1 !== null && node2 === null) {
        // 删除节点
        diffList.push({ type: "删除", origin: node1, now: null });
    } else if (node1.val !== node2.val) {
        // 修改，继续遍历下面的节点
        diffList.push({ type: "修改", origin: node1, now: node2 });
        diffTree(node1.left, node2.left, diffList);
        diffTree(node1.right, node2.right, diffList);
    } else {
        diffTree(node1.left, node2.left, diffList);
        diffTree(node1.right, node2.right, diffList);
    }
    return diffList;
}
console.log(diffTree(A, A1));