## Link
```js
import React from 'react';
import ctx from "../my-react-router/RouterContext";
import {parsePath} from "history";

function Link(props) {
    return (
        <ctx.Consumer>
            {value => {
                let loc;
                if (typeof props.to === 'object') {
                    loc = props.to;
                } else {
                    //将路径字符串转化为location
                    loc = parsePath(props.to);
                }
                const href = value.history.createHref(loc);
                return <a onClick={(e) => {
                    e.preventDefault();
                    value.history.push(loc);
                    //push一个location无刷新跳转
                }} href={href}>{props.children}</a>
            }
            }
        </ctx.Consumer>
    );
}

export default Link;
```