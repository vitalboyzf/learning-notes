const {
    ListNode
} = require("./ListNode");
const A = new ListNode(2);
const B = new ListNode(4);
const C = new ListNode(3);
A.next = B;
B.next = C;
const D = new ListNode(5);
const E = new ListNode(6);
const F = new ListNode(4);
D.next = E;
E.next = F;
const addTwoNumbers = function (l1, l2) {
    let head = new ListNode(0);
    let cur = head;
    let carry = 0;
    while (l1 !== null || l2 !== null) {
        const x = l1 === null ? 0 : l1.val;
        const y = l2 === null ? 0 : l2.val;
        let sum = x + y + carry;
        // 取十位
        carry = Math.floor(sum / 10);
        // 取个位
        sum = sum % 10;
        cur.next = new ListNode(sum);
        cur = cur.next;
        if (l1 !== null) {
            l1 = l1.next;
        }
        if (l2 !== null) {
            l2 = l2.next;
        }
    }
    if (carry === 1) {
        cur.next = new ListNode(1);
    }
    return head.next;
};
let ret = addTwoNumbers(A, D);
console.log(ret);