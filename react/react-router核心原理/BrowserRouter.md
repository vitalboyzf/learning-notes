## BrowserRouter
```js
import React, {Component} from 'react';
import {createBrowserHistory} from "history";
import {Router} from "../my-react-router";
class BrowserRouter extends Component {
    //创建一个history对象，props作为配置对象
    history = createBrowserHistory(this.props);
    render() {
        return (
            //将history对象和children作为属性传给Router Router组件用于注册上下文
            <Router history={this.history} children={this.props.children}/>
        );
    }
}
export default BrowserRouter;
```