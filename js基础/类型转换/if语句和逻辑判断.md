以下是falsely变量，除此之外都是truly变量
- 0(+0,-0) NaN '' null undefined false
- !!0 === !!NaN === !!null === !!undefined === !!false === false
- falsely变量if/&&/||/while/switch判断条件为false
- 大多数时候都应该使用===做判断，只有null和undefined作为条件判断时使用==要好一些
- 以下结果都是为true,在开发过程应该避免使用== 和 false联合使用做判断  
```js
    console.log("" == false);
    console.log([] == false);
    console.log(0 == false);
    console.log("0" == false);
    console.log("" == []);
    console.log(0 == []);
    console.log("" == 0);
    console.log([] == ![]); // => [] == false 根据ToBoolean规则
```