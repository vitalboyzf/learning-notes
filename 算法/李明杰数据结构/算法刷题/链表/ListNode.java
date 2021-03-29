package 算法刷题.链表;

public class ListNode {
    public int val;
    public ListNode next;

    public ListNode(int x) {
        val = x;
    }

    @Override
    public String toString() {
        if (val == 0) {
            return null;
        } else {
            return " " + val + " ->" + next;
        }
    }
}
