/* eslint-disable new-cap */
/* eslint-disable no-func-assign */
// let a = 0, b = 0;
function A(a) {
    A = function (b) {
        console.log(a + b++);
    };
    console.log(a++);
}
A(1);
A(2);