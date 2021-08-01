# jsonp 原理
### 前端部分
1. 判断请求与当前的域是否同源，如果同源正常发送ajax请求
2. 如果不同源，生成一个script标签
3. 随机生成一个callback名字,创建一个方法作为callback的值
4. 设置script标签的src为要请求的地址
5. 将callback作为参数拼接在后面
### 后端部分
6. 后端收到请求后，开始准备返回的数据
7. 后端拼接数据，将要返回的数据用callback的值作为函数，数据作为参数返回给浏览器
 - 例如：callback=cb1234634,要返回的数据为{name:'hello'},拼接为cb1234634({name:'hello'})
### 浏览器接收到内容，会将返回结果当做js代码执行，从而执行cb1234634({name:'hello'})
## 代码实现
```js
   var $ = {
            ajax: function (options) {
                let url = options.url;
                //需要请求的url
                let dataType = options.dataType;
                //是否是dataType类型如果是jsonp，进行处理
                if (dataType === "jsonp") {
                    const script = document.createElement("script");
                    //生成一个script标签
                    const callback = "cb" + Math.floor(Math.random() * 1000000);
                    //生成一个随机的callback作为函数名
                    window[callback] = options.success;
                    //在window挂载一个属性，属性名为随机生成的callback,属性值为传入的回调函数
                    //浏览器接收到服务端返回的函数后，就会执行window上的这个函数，也就是回调函数
                    if (url.indexOf("?") !== -1) {
                        //如果请求地址有?需要用&拼接
                        script.src = url + "&callback=" + callback;
                    }else{
                        //如果请求url没有？
                        script.src = url + "?callback=" + callback;
                    }
                    script.id = callback;//给script标签添加一个id
                    document.body.appendChild(script);//添加到body中
                }
            }
        }
```