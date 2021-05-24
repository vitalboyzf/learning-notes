const foo = function () {
    let i = 0;
    return function () {
        console.log(i++);
    };
};
const f1 = foo();
f1();
f1();
const f2 = foo();
f2();
f2();
f1();
f1();


function func(n, o) {
    console.log(o); // undefined 0 1 1
    return {
        func(m) {
            return func(m, n);
        }
    };
}
const c = func(0).func(1);
c.func(2);
c.func(3);