## Router 

- 用于注入上下文

```js
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ctx from './RouterContext';
import matchPath from "./matchPath";
class Router extends Component {
    static propTypes = {
        history: PropTypes.object.isRequired,
        children: PropTypes.node,
    }
    state = {
        location: this.props.history.location
    }

    componentDidMount() {
        //利用监听函数监听路径变化,这里的location是新的location,新的action
        this.unListen = this.props.history.listen((location, action) => {
            this.props.history.action = action;
            //更新路由切换方式 POP PUSH REPLACE
            this.setState({
                location
                //刷新组件,更改location
            })
        })
    }

    componentWillUnmount() {
        this.unListen();
        //组件卸载，取消监听器
    }

    render() {
        const ctxValue = {
            //每次重新渲染重新创建一个对象，作为上下文注入
            history: this.props.history,
            location: this.props.history.location,
            match: matchPath('/', this.props.location)
        }
        return (
            <ctx.Provider value={ctxValue}>
                {this.props.children}
            </ctx.Provider>
        );
    }
}

export default Router;
```