[TOC]
## BrowserRouter 
```html
 <BrowserRouter
 basename: string所有位置的基准 URL
 forceRefresh: bool是否强制刷新
 getUserConfirmation={func}
 keyLength: number location.key 的长度，默认为 6。
 />
```
## 实现导航守卫
- 根据history的阻塞器函数history.block
- 调用这个函数，就可以生成阻塞器，监听路径跳转，当路径想要跳转的时候，就会调用Reater里的属性方法getUserConfirmation，block中传的参数赋给getUserConfirmation函数第一个形参，getUserConfirmation函数第二个参数是一个回调函数，执行这个函数传参true则页面发生跳转，否则不发生跳转。
## Prompt 需要配合getUserConfirmation使用
```html
 <Prompt when={条件为true时跳转出现弹窗} message="弹窗的消息"/>
```
## Link
- to 可以是字符串，表示要跳转的路径
 - 可以是对象
 ```html
  <Link to={{
   pathname:要跳转的路径,
   search:a=w&b=r,//携带的信息
   hash:#xxx,
   state 存储到location 中的额外状态数据
   replace: bool
   innerRef: func
  }}></Link>
 ```
## NavLink 
 - activeClassName: string 激活状态的类名，默认active
 - activeStyle: object 当元素处于激活状态时应用的样式
 - exact: bool 如果为 true，则只有在位置完全匹配时才应用激活类/样式。
 - strict: bool 考虑位置的路径名后面的斜杠
 - isActive: func 添加额外逻辑以确定链接是否处于激活状态的函数。如果你要做的不仅仅是验证链接的路径名与当前 URL 的路径名相匹配，那么应该使用它。
 ```js
   const oddEvent = (match, location) => {
  if (!match) {
    return false;
  }
  const eventID = parseInt(match.params.eventID);
  return !isNaN(eventID) && eventID % 2 === 1;
}

<NavLink to="/events/123" isActive={oddEvent}>Event 123</NavLink>
 ```
## <Redirect>
 - 要重定向到的 URL，可以是 path-to-regexp 能够理解的任何有效的 URL 路径。所有要使用的 URL 参数必须由 from 提供。
 - to: object 
  ```html
  <Redirect to={{
  pathname: '/login',
  search: '?utm=your+face',
  state: {
    referrer: currentLocation
  }
}} />
  ```
- push: bool
- from: string 要从中进行重定向的路径名，可以是 path-to-regexp 能够理解的任何有效的 URL 路径。所有匹配的 URL 参数都会提供给 to，必须包含在 to 中用到的所有参数，to 未使用的其它参数将被忽略。
- 只能在 <Switch> 组件内使用 <Redirect from>，以匹配一个位置
- exact: bool
- strict: bool
