function merge(l1, l2) {
    if (!l1 || !l2) return l1 || l2;
    if (l1.val < l2.val) {
        l1.next = merge(l1.next, l2);
        return l1;
    } else {
        l2.next = merge(l1, l2.next);
        return l2;
    }
}

function sort(start, end) {
    if (start === end) return start;
    let fast = start,
        slow = start;
    while (fast !== end && fast.next !== end) {
        fast = fast.next.next;
        slow = slow.next;
    }
    const l2 = sort(slow.next, end);
    slow.next = null;
    const l1 = sort(start, slow);
    return merge(l1, l2);
}

function sortList(head) {
    return sort(head, null);
}