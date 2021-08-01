function isValid(str) {
    const stack = [];
    const type = {
        "(": ")",
        "[": "]",
        "{": "}"
    };
    for (let i = 0; i < str.length; i++) {
        const char = str[i];
        if (type[char]) {
            stack.push(char);

        } else {
            let stackTop = stack.pop();
            if (type[stackTop] !== char) return false;
        }
    }
    return stack.length === 0;
}
console.log(isValid("()"));