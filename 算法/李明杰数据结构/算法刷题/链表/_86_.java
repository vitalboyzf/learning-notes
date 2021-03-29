package 算法刷题.链表;

/*
 * 分割链表
 * https://leetcode-cn.com/problems/partition-list/
 * */
public class _86_ {
    public ListNode partition(ListNode head, int x) {
        if (head == null) return null;
        ListNode lHead = new ListNode(0);
        ListNode lTail = lHead;
        ListNode rHead = new ListNode(0);
        ListNode rTail = rHead;
        while (head != null) {
            if (head.val < x) {
                // 放到左边链表
                lTail.next = head;
                lTail = lTail.next;
            } else {
                // 放到右边
                rTail.next = head;
                rTail = rTail.next;
            }
            head = head.next;
        }
        // 考虑右边的节点后面都比x小的情况
        rTail.next = null;
        // 组合两个链表
        lTail.next = rHead.next;
        return lHead.next;
    }

    public static void main(String[] args) {

    }
}
