// https://leetcode-cn.com/problems/merge-k-sorted-lists/
const {
    ListNode
} = require("./ListNode");
const A = new ListNode("1");
const B = new ListNode("4");
const C = new ListNode("7");
A.next = B;
B.next = C;
const D = new ListNode("2");
const E = new ListNode("3");
const F = new ListNode("8");
D.next = E;
E.next = F;

function mergeTwoLists(list1, list2) {
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

function mergeKLists(lists) {
    if (lists === null || lists.length === 0) return null;
    let node = null;
    for (let i = 0; i < lists.length; i++) {
        node = mergeTwoLists(node, lists[i]);
    }
    return node;
}
const result = mergeKLists([A, D]);
console.log(JSON.stringify(result));