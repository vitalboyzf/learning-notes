package 算法刷题.链表;

/*
 * 回文链表
 * https://leetcode-cn.com/problems/palindrome-linked-list/
 * */
public class _234_ {
    private static ListNode getMiddleNode(ListNode head) {
        ListNode fast = head;
        ListNode slow = head;
        while (fast.next != null && fast.next.next != null) {
            fast = fast.next.next;
            slow = slow.next;
        }
        return slow;
    }

    private static ListNode reverseList(ListNode head) {
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

    public static boolean isPalindrome(ListNode head) {
        if (head == null || head.next == null) return true;
        if (head.next.next == null) return head.val == head.next.val;
        // 找到中间节点
        ListNode middle = getMiddleNode(head);
        // 翻转中间节点的右边部分
        assert middle != null;
        ListNode rHead = reverseList(middle.next);
        ListNode lHead = head;
        while (rHead != null) {
            if (rHead.val != lHead.val) return false;
            rHead = rHead.next;
            lHead = lHead.next;
        }
        return true;
    }

    public static void main(String[] args) {
        ListNode A = new ListNode(2);
        ListNode B = new ListNode(1);
        ListNode C = new ListNode(1);
        ListNode D = new ListNode(2);

        A.next = B;
        B.next = C;
        C.next = D;
        System.out.println(isPalindrome(A));
    }
}
