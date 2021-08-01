// 找到当前节点右边的最小值
function successor(root) {
    root = root.right;
    while (root.left !== null) root = root.left;
    return root.val;
}

// 找到当前节点左边的最大值
function predecessor(root) {
    root = root.left;
    while (root.right !== null) root = root.right;
    return root.val;
}


// 0 1 2 7 11 12 13 25 33 34 36 40
const deleteNode = function (root, key) {
    if (root === null) return null;
    // 要删除的节点在右边，去右边查找
    if (key > root.val) root.right = deleteNode(root.right, key);
    // 要删除的节点在左边，去左边查找
    else if (key < root.val) root.left = deleteNode(root.left, key);
    // 已经找到了要删除的节点
    else {
        // 要删除的叶子节点，直接删除就可以了
        if (root.left === null && root.right === null) root = null;
        // 要删除的节点不是一个叶子节点，并且存在右节点
        else if (root.right !== null) {
            // 使用当前节点的后继节点（比当前节点大，并且最小的节点）替换当前节点值
            root.val = successor(root);
            // 查找右边删除值为val的节点
            root.right = deleteNode(root.right, root.val);
        }
        // 当前节点不是一个叶子节点，存在左节点，不存在右节点
        else {
            root.val = predecessor(root);
            // 查找左边删除值为val的节点
            root.left = deleteNode(root.left, root.val);
        }
    }
    return root;
};