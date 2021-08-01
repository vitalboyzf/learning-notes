const {
    A
} = require("./ListNode");

function reverseList(head) {
    if (head === null || head.next === null) {
        return head;
    }
    // A => B => C => D => E
    // null<=A  B => C => D => E
    // 找到倒数第二个D
    const newNode = reverseList(head.next);
    head.next.next = head;
    head.next = null;
    return newNode;
}

function reverseList1(head) {
    if (head === null || head.next === null) {
        return head;
    }
    // 上一个节点
    let prev = null;
    // 当前的节点
    let cur = head;
    // cur查找完毕最后指向空，prev指向最后一个节点
    while (cur) {
        // 保存下一个节点的指针
        let next = cur.next;
        // 当前节点指针执行上一个节点
        cur.next = prev;
        // 更新上一个节点的位置
        prev = cur;
        // 更新当前节点的位置
        cur = next;
    }
    return prev;
}
let res = reverseList1(A);
console.log(res);