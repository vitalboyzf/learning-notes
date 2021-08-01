// https://leetcode-cn.com/problems/add-strings/
/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
const addStrings = function (num1, num2) {
    let l1 = num1.length - 1;
    let l2 = num2.length - 1;
    let carry = 0;
    let ret = "";
    while (l1 >= 0 || l2 >= 0 || carry > 0) {
        let n1 = l1 >= 0 ? +num1[l1] : 0;
        let n2 = l2 >= 0 ? +num2[l2] : 0;
        let sum = n1 + n2 + carry;
        ret += sum % 10;
        carry = Math.floor(sum / 10);
        l1--;
        l2--;
    }
    return ret.split("").reverse("").join("");
};
console.log(3432432 + 543634);
console.log(addStrings("3432432", "543634"));