# RegExp
### 正则表达式基础概念
1. 字面量匹配：字符串中包含相应的字符串
2.  特殊字符：
 - . 匹配所有字符（除了\r\n）
 - ^ 表示以某些字符串开始
 - $ 表示以某些字符串结尾
 - \ 表示转义符（有特殊含义转化为普通意思，普通意思转化为特殊含义）
 - \t 匹配制表符 
 - \s 匹配空白字符 \S不匹配空白字符
 - \b 匹配单词边界 \B不匹配单词边界
 - \d 匹配一个数字 \D不匹配一个数字
 - \w 匹配数字字母下划线 
 - \u 匹配unicode
3. 字符集[字符范围]
 - 符合括号中一个 条件就可以匹配[a-zA-Z]
 - 匹配中文[\u4e00-\u9FA5]
 - [^0-9]^表示取反
4. 量词（紧挨着量词的规则，在左边）
 - *     最少零个 
 - +     最少匹配一个
 - ？    匹配零个或者一个 
 - {n}   匹配n个
 - {n,}  匹配>=n个
 - {n,m} 匹配n - m个
 ***量词后面加?表示非贪婪模式，尽可能少匹配***
5. | 或者 （分隔多个匹配规则一个规则，则完成匹配）
6. 常见应用：
 - 匹配邮箱地址：^/w+@/w+(\.\w+){1,2}$
 - 匹配一个座机号：^\d{1,3}-\d{4,8}$
 - 匹配一个正数： ^\d+(\.\d+)?$
 - 匹配一个小数：^-?\d+\.\d+$
 - 匹配一个整数：^-?\d+$
### js中使用正则表达式
1. 正则表达式表现为一个对象，该对象的构造函数为RegExp
2. 创建正则表达式
 - 字面量模式： var reg = /规则/;
 - 构造函数模式： var reg = new RegExp("规则","flag");
3. flag:
 - g 全局搜索
 - i 忽略大小写
 - m 多行匹配
4. 正则方法
 - RegExp.prototype.test();测试正则是否能匹配目标字符串【reg.test("字符串");】
 ***注意***：全局匹配开启后，匹配一个后，再匹配接着上次
 ```js
  var reg = /abc/g;
  console.log(reg.test(reg.lastIndex,"abc454365abc")) //true
  console.log(reg.test(reg.lastIndex,"abc454365abc")) //true
  console.log(reg.test(reg.lastIndex,"abc454365abc")) //false
  //再匹配匹配不到，从头匹配
  console.log(reg.test(reg.lastIndex,"abc454365abc")) //true
  console.log(reg.test(reg.lastIndex,"abc454365abc")) //true
  console.log(reg.test(reg.lastIndex,"abc454365abc")) //false
 ```
  - RegExp.prototype.exec("字符串")//匹配信息数组，***注意循环使用exec的时候要用全局匹配***
  ```js
    var reg = /abc/g;
    while(true){
      let result  = reg.exec(" abc 454365abc ")
      if(!result){
          break
      }
      console.log(`匹配到${result[0]}在下标${result.index}的位置`)
  }
  ```
5. 字符串对象中的正则
 - String.prototype.match(正则表达式) 匹配到的结果以数组显示，如果不是全局匹配，返回结果类似于RegExp.prototype,exec()函数
 - String.prototype.search(正则表达式) 返回正则第一个匹配到的字符串首字母的下标
 - String.prototype.split(正则表达式[,限制分割的个数])  按照正则表达式匹配的内容分割字符串
 - String.prototype.replace(需要被替换的内容（正则表达式匹配的内容）,"替换成新的内容"【这个地方可以是字符串，亦可以是函数】)
```js
  const str = "hello world"
        const newStr = str.replace(/\b[a-z]/g, function (match) {//匹配到的字符[串]
            //    console.log(match)
            return match.toUpperCase()
        })
        console.log(newStr)
```
### 进阶部分
1. 捕获组() 用小括号包裹的部分叫做捕获组，捕获组会出现在匹配结过中
 - 捕获组可以命名，叫做命名捕获组(?<命名>正则表达式)
 - 非捕获组(?:正则表达式)
 ```js
 str.replace(reg,function(match,捕获组1，捕获组2)){}
  str.replace(reg,function(match,"$1$2")){}//$1表示第一个捕获组，$2表示第二个捕获组
 ```
 - (正则表达式)\1+ 重复一次或多次捕获组捕获的内容
2. 正向预查(?=):检查某个字符后面的字符满足某个规则，该规则不成为匹配结果，并且不成为捕获组
  -  let reg = /[a-zA-Z](?=\d+)/ 检查是否有预查的内容，并不会添加到匹配结果
 ```js
 let s = "232134235345"
 let reg = /\B(?=(/d{3})+$)/g
 s.resplce(reg,',')
//判断密码强度函数
function judgePwd(pwd){
  if(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#,.]).{6,12}&/.test(pwd)){
    return "强"
  }else if(/^(?=.*[a-z])(?=.*[A-Z]).{6,12}&/.test(pwd)){
    return "中"
  }else if(/^(?=.*[a-z]).{6,12}&/.test(pwd)){
    return "弱"
  }else{
    return "密码不符合规范"
  }
}
 ```

3. 逆向序查(?!)：检查某个字符后面的字符不满足某个规则，该规则不成为匹配结果，并且不成为捕获组
4. 
```js
 str.replace(/\{\{(.+?)\}\}/g,(...args)=>{
             console.log(args);
        })
/*args数组：
         第一个数组元素：正则表达式匹配到的字符串
         第二个数组元素： 捕获组中匹配到的字符串
         第三个数组元素： 匹配的开始下标
         第四个元素：整个字符串
*/
```
