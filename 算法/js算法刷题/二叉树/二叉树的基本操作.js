function Node(value, left, right) {
    this.value = value;
    this.left = left || null;
    this.right = right || null;
}

Node.prototype = {
    show: function () {
        console.log(this.value);
    }
};

function Tree() {
    this.root = null;
}

Tree.prototype = {
    insert: function (value) {
        var node = new Node(value, null, null);
        if (!this.root) {
            this.root = node;
            return;
        }
        var current = this.root;
        var parent = null;
        while (current) {
            parent = current;
            if (value < parent.value) {
                current = current.left;
                if (!current) {
                    parent.left = node;
                    return;
                }
            } else {
                current = current.right;
                if (!current) {
                    parent.right = node;
                    return;
                }
            }

        }
    },
    preOrder: function (node) {
        if (node) {
            node.show();
            this.preOrder(node.left);
            this.preOrder(node.right);
        }
    },
    middleOrder: function (node) {
        if (node) {
            this.middleOrder(node.left);
            node.show();
            this.middleOrder(node.right);
        }
    },
    laterOrder: function (node) {
        if (node) {
            this.laterOrder(node.left);
            this.laterOrder(node.right);
            node.show();
        }
    },
    getMin: function () {
        var current = this.root;
        while (current) {
            if (!current.left) {
                return current;
            }
            current = current.left;
        }
    },
    getMax: function () {
        var current = this.root;
        while (current) {
            if (!current.right) {
                return current;
            }
            current = current.right;
        }
    },
    getDeep: function (node, deep) {
        deep = deep || 0;
        if (node === null) {
            return deep;
        }
        deep++;
        var dLeft = this.getDeep(node.left, deep);
        var dRight = this.getDeep(node.right, deep);
        return Math.max(dLeft, dRight);
    }
};

var t = new Tree();
t.insert(3);
t.insert(8);
t.insert(1);
t.insert(2);
t.insert(12);
t.insert(5);
t.insert(7);
t.insert(0);
t.insert(13);
t.insert(15);
// t.middleOrder(t.root);
module.exports = {
    tree: t.root,
    Node
};
// console.log(t.preOrder());
// console.log(t.getDeep(t.root, 0));
// console.log(t.getNode(5, t.root));