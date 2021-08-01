const {
    ListNode,
    printListNode
} = require("./ListNode");
const A = new ListNode(6);
const B = new ListNode(3);
const C = new ListNode(4);
const D = new ListNode(1);
const E = new ListNode(2);
const F = new ListNode(5);
A.next = B;
B.next = C;
C.next = D;
D.next = E;
E.next = F;
// 递归合并两个链表
function merge_recursion(l1, l2) {
    if (!l1 || !l2) return l1 || l2;
    if (l1.val < l2.val) {
        l1.next = merge_recursion(l1.next, l2);
        return l1;
    } else {
        l2.next = merge_recursion(l1, l2.next);
        return l2;
    }
}
// 合并两个链表
function merge_while(list1, list2) {
    if (!list1 || !list2) return list1 || list2;
    let virtualHead = new ListNode(0);
    let tail = virtualHead;
    while (list1 && list2) {
        if (list1.val < list2.val) {
            tail.next = list1;
            list1 = list1.next;
        } else {
            tail.next = list2;
            list2 = list2.next;
        }
        tail = tail.next;
    }

    tail.next = list1 || list2;
    return virtualHead.next;
}

function sort(start, end) {
    if (start === end) return start;
    let fast = start,
        slow = start;
    // 找到链表中点
    while (fast !== end && fast.next !== end) {
        fast = fast.next.next;
        slow = slow.next;
    }
    const l2 = sort(slow.next, end);
    slow.next = null;
    const l1 = sort(start, slow);
    return merge_while(l1, l2);
}

function sortList(head) {
    return sort(head, null);
}
console.log(printListNode(A));
console.log(printListNode(sortList(A)));