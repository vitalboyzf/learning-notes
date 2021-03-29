### 
```js
        console.log(parseInt(0.000008)); // 0 ("0"来自于"0.000008")
        console.log(parseInt(0.0000008)); // 8 ("8"来自于"8e-7",因为小数点后有六个零转化会使用科学计数法)
        console.log(parseInt(false, 16)); // 250 (把false看做"false",f代表15，a代表10，l不是16进制直接忽略)
        console.log(parseInt(parseInt, 16)); // 15 ("f"来自于"function")
        console.log(parseInt("0x10")); // 16
        console.log(parseInt("103", 2)); // 2
```