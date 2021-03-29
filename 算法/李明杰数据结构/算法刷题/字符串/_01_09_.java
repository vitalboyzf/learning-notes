package 算法刷题.字符串;

/*
 * 字符串轮转
 * */
public class _01_09_ {
    public static boolean isResolving(String s1, String s2) {
        if (s1 == null || s2 == null || s1.length() != s2.length()) return false;
        return (s1 + s1).contains(s2);
    }

    public static void main(String[] args) {
        System.out.println(isResolving("angzh", "zhang"));
    }
}
