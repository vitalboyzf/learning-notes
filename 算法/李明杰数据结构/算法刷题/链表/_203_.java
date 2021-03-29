package 算法刷题.链表;

/*
 *  移除链表元素
 * */
public class _203_ {
    public ListNode removeElements(ListNode head, int val) {
        if (head == null) return null;
        // 虚拟头结点
        ListNode newHead = new ListNode(0);
        ListNode newTail = newHead;
        while (head != null) {
            if (head.val != val) {
                newTail.next = head;
                newTail = newTail.next;
            }
            head = head.next;
        }
        newTail.next = null;
        return newHead.next;
    }
}
