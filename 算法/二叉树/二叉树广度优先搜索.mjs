import { A } from "./tree.mjs";
function breadthFirstSearch(rootList, target) {
    if (!Array.isArray(rootList)) {
        rootList = [rootList];
    }
    if (rootList === null || rootList.length === 0) return false;
    const childList = [];
    for (let i = 0; i < rootList.length; i++) {
        if (rootList[i] === null) continue;
        if (rootList[i].val === target) {
            return true;
        } else {
            childList.push(rootList[i].left);
            childList.push(rootList[i].right);
        }
    }
    return breadthFirstSearch(childList, target);
}
const result = breadthFirstSearch(A, "D");
console.log(result);