## history库介绍
1. 引入第三方库 history
2. 这个库提供三个函数 
   - createBrowserHistory(创建一个使用浏览器historyAPI的对象) 	
   - createHashHistory(创建一个浏览器使用hash的history对象)
   - createMemoryHistory(使用内存，和浏览器地址栏无关，用于移动端)
3. 这三个函数虽然结构(history)和参数不同，但返回的对象结构完全一致
### createBrowserHistory
 #### listen函数，用于监听地址栈指针变化
 - 该函数接收一个函数A作为参数
 - A接收两个参数location ,action
  + **location：记录新的地址**
   - 当前地址的信息
  + **action进入新地址的方式**
   - POP 指针移动，调用go,goBack,goForwarld,用户点击浏览器按钮
   - PUSH 调用createBrowserHistory返回对象的push方法
   - REPLACE 调用createBrowserHistory返回对象的replace方法
 - listen函数返回一个函数，调用这个返回函数就会取消监听地址变化
 #### block 函数用于设置一个阻塞，当页面发生跳转时，会将指定消息传递到getUserConfirmation，并调用getUserConfirmation函数
  - 调用函数的实参是一个字符串或者是一个函数，作为传递给getUserConfirmation的信息，如果是一个函数，函数的形参为locatioin和action
  - block函数调用返回一个函数A，调用A则取消阻塞器
 #### 配置对象 createBrowserHistory({配置对象})
 - basepath:"" 根路径
 - forceRefresh:false 是否强制刷新
 - keyLength:6 location对象key值长度
 - getUserConfirmation:((msg,callback)=>callback(windows.confirm(msg)))一个函数，该函数调用history对象block函数后，页面想要跳转时运行，msg为block传递过来的信息，callback是一个函数，只有调用callback(true)才跳转页面
### createHashHistory
- 配置大概对象
 - hashType:#后面的路径格式
  - hashbang已经被弃用
  - noslash: #a/b
  - slash: #/a/b
 - getUserConfirmation同上