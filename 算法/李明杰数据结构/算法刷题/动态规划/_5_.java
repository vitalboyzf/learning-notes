package 算法刷题.动态规划;

/*
 * 最长回文子串
 * https://leetcode-cn.com/problems/longest-palindromic-substring/
 * */
public class _5_ {
    // 动态规划
    /*
     *   b a b a
     * a       1
     * b     0 0
     * a   1 0 1
     * b 0 0 1 0
     */
    public static String longestPalindrome(String s) {
        if (s == null) return null;
        char[] arrS = s.toCharArray();
        if (arrS.length < 2) return s;
        boolean[][] dp = new boolean[arrS.length][arrS.length];
        int maxLen = 1;
        int startIndex = 0;
        // 从下到上
        for (int i = arrS.length - 1; i >= 0; i--) {
            // 从左到右
            for (int j = i; j < dp[0].length; j++) {
                // 第一种情况，s[i][j]的长度（j-i+1)<=2
                // dp[i][j] = (s[i] == s[j])
                // i到j字符串长度
                int len = j - i + 1;
                if (len <= 2) {
                    dp[i][j] = arrS[i] == arrS[j];
                }
                // 第二种情况，如果s[i+1][j-1]是回文串，并且s[i]等于s[j]那么s[i][j]是回文串
                // 所以递推式 dp[i][j] = dp[i+1][j-1]&&(s[i]==s[j])
                else {
                    dp[i][j] = dp[i + 1][j - 1] && (arrS[i] == arrS[j]);
                }
                // 如果dp[i][j]范围是回文字符串
                if (dp[i][j]) {
                    // 判断这段长度是否大于记录的最大长度，如果是更新maxLen,startIndex
                    if (len > maxLen) {
                        maxLen = j - i + 1;
                        startIndex = i;
                    }
                }
            }
        }
        return s.substring(startIndex, maxLen + startIndex);
    }

    // 计算l和j向两边扩张的回文长度
    private static int palindrome(char[] cs, int l, int r) {
        while (l >= 0 && r < cs.length && cs[l] == cs[r]) {
            l--;
            r++;
        }
        return r - l - 1;
    }

    // 拓展中心法
    public static String longestPalindrome1(String s) {
        if (s == null) return null;
        char[] arrS = s.toCharArray();
        if (arrS.length < 2) return s;
        int maxLen = 1;
        int startIndex = 0;
        for (int i = arrS.length - 2; i >= 1; i--) {
            // 以字符为中心向两边扩展
            int len1 = palindrome(arrS, i - 1, i + 1);
            // 以字符右边的间隙为中心向两边拓展
            int len2 = palindrome(arrS, i, i + 1);
            // 找出最大的回文查长度
            int curMaxLen = Math.max(len1, len2);
            if (curMaxLen > maxLen) {
                // 更新最大长度
                maxLen = curMaxLen;
                // 回文字符串的起点
                startIndex = i - ((maxLen - 1) >> 1);
            }
        }
        // 处理0号字符右边间隙为中心的最长回文子串
        if (arrS[0] == arrS[1] && maxLen < 2) {
            // cs[0,1]就是最长回文子串
            maxLen = 2;
        }
        return s.substring(startIndex, maxLen + startIndex);
    }

    // 拓展中心法优化 （连续字符作为扩展中心）
    public static String longestPalindrome2(String s) {
        if (s == null) return null;
        char[] arrS = s.toCharArray();
        if (arrS.length < 2) return s;
        int maxLen = 1;
        int startIndex = 0;
        int i = 0;
        while (i < arrS.length) {
            int l = i - 1;
            // 找到右边第一个不等于arrS[i]的值
            int r = i + 1;
            while (r < arrS.length && arrS[r] == arrS[i]) {
                r++;
            }
            // r会变成新的i
            i = r;
            // l向左，r向右拓展
            while (l >= 0 && r < arrS.length && arrS[l] == arrS[r]) {
                l--;
                r++;
            }
            // 拓展结束 arrS[l+1,r)就是刚找到的最大回文子串
            // ++l后，l即使刚找到的回文子串的开始索引
            int len = r - ++l;
            if (len > maxLen) {
                maxLen = len;
                startIndex = l;
            }
        }
        return s.substring(startIndex, maxLen + startIndex);
    }

    //    马拉车算法
    // 预处理 给字符添加^#$
    private static char[] preprocess(char[] oldCs) {
        // baba -> ^#b#a#b#a#$
        char[] cs = new char[(oldCs.length << 1) + 3];
        cs[0] = '^';
        cs[1] = '#';
        cs[cs.length - 1] = '$';
        for (int i = 0; i < oldCs.length; i++) {
            int idx = (i + 1) << 1;
            cs[idx] = oldCs[i];
            cs[idx + 1] = '#';
        }
        return cs;
    }

    public static String longestPalindromeManacher(String s) {
        if (s == null) return null;
        char[] arrS = s.toCharArray();
        if (arrS.length < 2) return s;
        char[] cs = preprocess(arrS);
        // TODO
        return null;
    }

    public static void main(String[] args) {
        System.out.println(longestPalindrome("baba"));
    }
}