 function removeDuplicates(str) {
     let strArr = str.split("");
     let i = 0;
     while (i < strArr.length - 1) {
         if (strArr[i] === strArr[i + 1]) {
             strArr.splice(i, 2);
             i = 0;
         } else {
             i++;
         }
     }
     return strArr.join("");
 }

 function removeDuplicates_stack(str) {
     const stack = [];
     for (let i = 0; i < str.length; i++) {
         const char = str.charAt(i);
         const stackTop = stack.pop();
         if (stackTop !== char) {
             stack.push(stackTop);
             stack.push(char);
         }
     }
     return stack.join("");
 }
 console.log(removeDuplicates_stack("abbaca"));