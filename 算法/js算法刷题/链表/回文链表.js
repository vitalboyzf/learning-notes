let isPalindrome = function (head) {
    let tempHead = head;
    let LinkArr = [];
    // 将链表转化为数组，进行操作
    while (tempHead) {
        LinkArr.push(tempHead);
        tempHead = tempHead.next;
    }
    let left = 0,
        right = LinkArr.length - 1;
    while (left < right) {
        if (LinkArr[left].val !== LinkArr[right].val) {
            return false;
        }
        left++;
        right--;
    }
    return true;
};