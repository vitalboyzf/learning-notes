function hasCycle(head) {
    if (head === null) return false;
    let fast = head;
    let slow = head;
    // 快指针每次走两步，慢指针每次走一步，每次快指针距离慢指针近一步，如果是环状链表一定会相遇
    while (fast.next !== null && fast.next.next !== null) {
        fast = fast.next.next;
        slow = slow.next;
        if (slow === fast) return true;
    }
    return false;
}