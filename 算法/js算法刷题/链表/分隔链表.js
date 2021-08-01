const {
    ListNode
} = require("./ListNode");
const A = new ListNode(1);
const B = new ListNode(4);
const C = new ListNode(3);
const D = new ListNode(2);
const E = new ListNode(5);
const F = new ListNode(2);
A.next = B;
B.next = C;
C.next = D;
D.next = E;
E.next = F;
// 小于x的节点都在大于或大于x的节点前
const partition = function (root, x) {
    let leftNode = new ListNode(0);
    let leftTail = leftNode;
    let rightNode = new ListNode(0);
    let rightTail = rightNode;
    let head = root;
    while (head) {
        if (head.val < x) {
            // 放到左侧链表
            leftTail.next = head;
            leftTail = head;
        } else {
            rightTail.next = head;
            rightTail = head;
        }
        head = head.next;
    }
    rightTail.next = null;
    // 拼接
    leftTail.next = rightNode.next;
    return leftNode.next;
};
console.log(JSON.stringify(partition(A, 4)));