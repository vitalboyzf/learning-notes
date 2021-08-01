const {
    tree
} = require("./二叉树的基本操作");
// 序列化
function serialize(pRoot, arr = []) {
    if (!pRoot) {
        arr.push("#");
    } else {
        arr.push(pRoot.value);
        serialize(pRoot.left, arr);
        serialize(pRoot.right, arr);
    }
    return arr.join(",");
}
// 反序列化
function deserialize(s) {
    if (!s) {
        return null;
    }

    function _deserialize(arr) {
        let node = null;
        const current = arr.shift();
        if (current !== "#") {
            node = {
                value: current
            };
            node.left = _deserialize(arr);
            node.right = _deserialize(arr);
        }
        return node;
    }
    return _deserialize(s.split(","));
}


const ser = serialize(tree);
console.log(ser);
console.log(deserialize(ser));