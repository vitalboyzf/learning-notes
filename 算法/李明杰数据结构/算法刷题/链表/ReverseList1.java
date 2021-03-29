package 算法刷题.链表;

public class ReverseList1 {
    public static ListNode reverse(ListNode head) {
        // 下一个翻转后的节点的next指向节点
        ListNode nextNode = null;
        while (head != null) {
            // 用一个临时变量保存head.next
            ListNode temp = head.next;
            head.next = nextNode;
            nextNode = head;
            // head指向下一个节点
            head = temp;
        }
        return nextNode;
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
        System.out.println(A);
    }
}
