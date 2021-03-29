package 算法刷题.链表;

public class ReverseList {
    public static ListNode reverse(ListNode head) {
        ListNode preNode = null;
        while (head != null) {
            // 保留下一个节点的记录
            ListNode next = head.next;
            // 当前节点的下一个节点指向上一个节点
            head.next = preNode;
            // 将当前节点作为下一个节点的上一个节点
            preNode = head;
            // 指针后移指向下一个节点
            head = next;
        }
        return preNode;
    }

    public static void main(String[] args) {
        ListNode A = new ListNode(1);
        ListNode B = new ListNode(2);
//        ListNode C = new ListNode(3);
//        ListNode D = new ListNode(4);
//        ListNode E = new ListNode(5);
        A.next = B;
//        B.next = C;
//        C.next = D;
//        D.next = E;
        System.out.println(reverse(A));
    }
}
