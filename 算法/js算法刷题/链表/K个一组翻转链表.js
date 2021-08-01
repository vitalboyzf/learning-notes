const {
    A,
    ListNode
} = require("./ListNode");

function reverse(head) {
    let prev = null;
    // 当前考察的节点
    let cur = head;
    // num小于n，则表示当前节点需要反转
    while (cur) {
        // 当前节点的下一个节点
        let next = cur.next;
        // 当前节点的后继指针指向prev
        cur.next = prev;
        // prev指向当前节点
        // 表示其是next节点反转后的前一个节点
        prev = cur;
        // cur指向下一个节点
        // 表示下一个节点是待反转节点
        cur = next;
    }
    return prev;
}

function reverseKGroup(head, k) {
    let dummy = new ListNode(0);
    dummy.next = head;
    let pre = dummy;
    let end = dummy;
    // 如果end不是最后一个节点就进行循环
    while (end.next !== null) {
        for (let i = 0; i < k && end !== null; i++) {
            end = end.next;
        }
        // 如果end到头了，退出循环，不再进行反转
        if (end === null) break;
        // 需要反转的开始节点
        let start = pre.next;
        //  保存反转节点的下一个节点的指针
        let next = end.next;
        // 在end节点后面断开链表
        end.next = null;
        // 进行反转 [start,end],并将反转后的链表拼接回来
        pre.next = reverse(start);
        // 将后面断开的节点拼接回来
        start.next = next;
        // 更新pre，end位置
        end = pre = start;
    }
    return dummy.next;
}
console.log(reverseKGroup(A, 2));