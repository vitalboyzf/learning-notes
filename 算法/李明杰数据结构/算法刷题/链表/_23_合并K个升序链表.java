package 算法刷题.链表;

public class _23_合并K个升序链表 {
    public ListNode mergeTwoLists(ListNode a, ListNode b) {
        if (a == null || b == null) return a == null ? b : a;
        // 虚拟头结点
        ListNode head = new ListNode(0);
        ListNode tail = head;
        ListNode tempA = a;
        ListNode tempB = b;
        while (tempA != null && tempB != null) {
            if (tempA.val < tempB.val) {
                tail.next = tempA;
                tempA = tempA.next;
            } else {
                tail.next = tempB;
                tempB = tempB.next;
            }
            tail = tail.next;
        }
        tail.next = tempA == null ? tempB : tempA;
        return head.next;
    }

    public ListNode mergeKLists(ListNode[] lists) {
        if (lists == null || lists.length == 0) return null;
        ListNode ret = null;
        for (ListNode list : lists) {
            ret = mergeTwoLists(ret, list);
        }
        return ret;
    }

    public static void main(String[] args) {
        ListNode A = new ListNode(1);
        ListNode B = new ListNode(4);
        ListNode C = new ListNode(5);
        ListNode D = new ListNode(1);
        ListNode E = new ListNode(3);
        ListNode F = new ListNode(4);
        ListNode G = new ListNode(2);
        ListNode H = new ListNode(6);
        ListNode[] listNodes = {A, B, C, D, E, F, G, H};
        System.out.println(new _23_合并K个升序链表().mergeKLists(listNodes));
    }
}
