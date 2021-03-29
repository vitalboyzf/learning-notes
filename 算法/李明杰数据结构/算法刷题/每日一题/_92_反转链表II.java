package 算法刷题.每日一题;

import 算法刷题.链表.ListNode;

// https://leetcode-cn.com/problems/reverse-linked-list-ii/
public class _92_反转链表II {
    public ListNode reverseBetween(ListNode head, int left, int right) {
        int l = 1;
        // tempHead 为需要反转的链表的上一个节点
        ListNode tempHead = head;
        while (l++ < left - 1) {
            tempHead = tempHead.next;
        }
        ListNode reverseHead = left == 1 ? tempHead : tempHead.next;
        ListNode tail = reverseHead;
        // 需要反转节点的个数
        int sum = right - left + 1;
        int i = sum;
        while (i-- >= 1) {
            tail = tail.next;
        }
        int cur = 1;
        ListNode preNode = tail;
        while (reverseHead != null) {
            if (cur > sum) {
                break;
            }
            ListNode next = reverseHead.next;
            reverseHead.next = preNode;
            preNode = reverseHead;
            reverseHead = cur++ < sum ? next : reverseHead;
        }
        if (left != 1) tempHead.next = reverseHead;
        else return reverseHead;
        return head;
    }

    public static void main(String[] args) {
        ListNode A = new ListNode(1);
        ListNode B = new ListNode(2);
        ListNode C = new ListNode(3);
        ListNode D = new ListNode(4);
        ListNode E = new ListNode(5);
        A.next = B;
        B.next = C;
        C.next = D;
        D.next = E;
        System.out.println(A);
        System.out.println(new _92_反转链表II().reverseBetween(A, 1, 1));
    }
}
