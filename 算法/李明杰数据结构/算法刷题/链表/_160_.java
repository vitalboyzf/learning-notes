package 算法刷题.链表;

/*
 * 相交链表
 * https://leetcode-cn.com/problems/intersection-of-two-linked-lists/
 * */
public class _160_ {
    public ListNode getIntersectionNode(ListNode headA, ListNode headB) {
        if (headA == null || headB == null) {
            return null;
        }
        ListNode curA = headA, curB = headB;
        while (curA != curB) {
            curA = (curA == null) ? headB : curA.next;
            curB = (curB == null) ? headA : curB.next;
        }
        return curA;
    }
}
