const deleteNode = function (head, val) {
    let ret = head;
    let pre = null;
    while (head) {
        if (head.val === val) {
            if (pre === null) {
                return ret.next;
            } else {
                pre.next = head.next;
            }
        }
        pre = head;
        head = head.next;
    }
    return ret;
};