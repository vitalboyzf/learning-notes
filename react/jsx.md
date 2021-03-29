# JSX
- Facebook起草的JS扩展语法
- 本质是一个JS对象，会被babel编译，最终会被转换为React.createElement
- 每个JSX表达式，有且仅有一个根节点
  - React.Fragment
- 每个JSX元素必须结束（XML规范）

## 在JSX中嵌入表达式

- 将表达式作为内容的一部分
  - null、undefined、false不会显示
  - 普通对象，不可以作为子元素
  - 可以放置React元素对象
- 将表达式作为元素属性
- 属性使用小驼峰命名法
- 防止注入攻击
  - 自动编码
  - dangerouslySetInnerHTML

## 元素的不可变性

- 虽然JSX元素是一个对象，但是该对象中的所有属性不可更改
- 如果确实需要更改元素的属性，需要重新创建JSX元素
##### 一.什么是jsx
- 1.jsx本质是js对象，会被babel编译，最终会转化成React.createElement
- 2.每个jsx表达式，有且仅有一个根节点，每个jsx元素必须结束 
```javascript 
 ag:<img/> <input/>>
```
【遵循xml规范】
- 3.在react中jsx会被编译成react对象
##### 二.将表达式作为内容的一部分 最好用()括起来
  ```javascript
    ag: const div = (<div>这是一个div标签</div>)
  ```
 - 1.false undefined null 不会被渲染 {undefined}
 - 2.普通对象不可以作为子元素 数组可以作为子元素，会被依次遍历出来
 ```javascript
  obj = {name:'better',foo:'foo'}
  const div = (<div>{obj}</div>) //这样写会报错
 ```
 - 3.将表达式作为元素属性
 ```javascript
   <img src={imgSrc}/>
 ```
 - 4.属性使用小驼峰命名法,style里用表达式{}里的对象
  ```javascript
    const div = (<div className="name" style={{
        backgroundColor:'red'
    }}></div>);
  ```
 - 5.防止注入攻击,必须用dangerouslySetInnerHTML属性，才能插入字符dom
   ```javascript
   const div = (<div dangerouslySetInnerHTML={{
                   __html: "<h1>这是一个h1</h1>"
                 }}>
              </div>);
   ```

##### 三.元素不可变性
   虽然jsx元素是个对象，但是该对象中所有属性不可改变，如果需要改变，则需要重新创建jsx原素。