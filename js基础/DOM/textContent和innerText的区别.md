1. textContent 会获取style= “display:none” 中的文本，而innerText不会 
2. textContent 会获取style标签里面的文本，而innerText不会
3. textContent不会理会html格式，直接输出不换行的文本 （每个元素的内容都独占一行）
4. innerText会根据标签里面的元素独立一行（块级元素独占一行）
5. 兼容性： 
* innerText 对IE的兼容性较好 
* textContent虽然作为标准方法但是只支持IE8+以上的浏览器 
* 最新的浏览器，两个都可以使用

``` HTML
<body>
    <div class="wrapper">
        <div class="first">
            <span>span标签</span>
            <a href="w">第一个a</a>
            <a href="e">第二个a</a>
            <p>我是一个p标签</p>
            <div style="display:none">我是一个display的div标签</div>
            <style>
                p {
                    color: red
                }
            </style>
        </div>
        <div class="second"></div>
    </div>
    <script>
        const first = document.getElementsByClassName("first")[0];
        console.log("innerText:", first.innerText);
        // innerText: span标签 第一个a 第二个a
        // 我是一个p标签
        console.log("textContent:", first.textContent);
        // textContent: 
        //     span标签
        //     第一个a
        //     第二个a
        //     我是一个p标签
        //     我是一个display的div标签
        //         p {
        //             color: red
        //         }
    </script>
</body>
```
