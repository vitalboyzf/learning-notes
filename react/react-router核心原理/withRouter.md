## withRouter
```js
import React from 'react';
import ctx from "./RouterContext";
// 高阶函数
function WithRouter(Comp) {
    function RouterWrapper(props) {
            // 调用ctx消费者，注入上下文
        return (
            <ctx.Consumer>
                {/*{value => console.log('value:',value)}*/}
               // 注入上下文
                {ctx => <Comp  {...ctx}{...props} />}
            </ctx.Consumer>
        );
    }
   // 修改调试工具中的名称
    RouterWrapper.displayName = `withRouter(${Comp.displayName ? Comp.displayName : Comp.name})`;
    return RouterWrapper;
}

export default WithRouter;
```