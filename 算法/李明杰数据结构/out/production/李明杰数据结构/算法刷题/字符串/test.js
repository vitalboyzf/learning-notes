const checkInclusion = function (s1, s2) {
    const reS1 = s1.split("").reverse().join("");
    return s2.includes(s1) || s2.includes(reS1);
};

console.log(checkInclusion("ab", "eidbaooo"));