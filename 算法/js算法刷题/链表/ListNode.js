function printListNode(head) {
    let ret = "";
    while (head) {
        ret += head.val;
        if (head.next) ret += " => ";
        head = head.next;
    }
    return ret;
}

function ListNode(val) {
    this.val = val;
    this.next = null;
}
const A = new ListNode("A");
const B = new ListNode("B");
const C = new ListNode("C");
const D = new ListNode("D");
const E = new ListNode("E");
A.next = B;
B.next = C;
C.next = D;
D.next = E;
module.exports = {
    ListNode,
    printListNode,
    A
};