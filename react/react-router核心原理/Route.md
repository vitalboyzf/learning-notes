## Route
```js
import React, {Component} from 'react';
import ctx from './RouterContext';
import matchPath from "./matchPath";

class Route extends Component {
    /*
    path:匹配路径
    children:一定渲染的子元素
    render：匹配到后渲染的函数
    component：匹配到后渲染的组件(优先级比render高比children低)
    以下调用matchPath方法的配置
    exact
    strict
    sensitive
     */
    matchRoute(location) {
        const {exact = false, sensitive = false, strict = false} = this.props;
        // 根据path匹配规则，和当前地址路径返回match对象
        return matchPath(this.props.path || "/", location.pathname, {
            exact,
            sensitive,
            strict
        });
    }

    consumerFunc = (value) => {
        const ctxValue = {
            history: value.history,
            location: value.location,
            match: this.matchRoute(value.location)
        }
        // 重新创建一个Provide
        return <ctx.Provider value={ctxValue}>
            {this.renderChildren(ctxValue)}
        </ctx.Provider>
    }

    renderChildren(ctx) {
        // 如果传入children
        if (this.props.children) {
            // 如果传入的children是函数，执行函数并将上下文对象传入
            if (typeof this.props.children === 'function') {
                return this.props.children(ctx);
                // 如果是元素节点，直接函数元素节点
            } else {
                return this.props.children;
            }
        }
        // 如果没有匹配上，直接返回null
        if (!ctx.match) {
            return null;
        }
        // 如果没有传入component并且传入render
        if (!this.props.component && this.props.render) {
            // 返回执行render并将上下文传入
            return this.props.render(ctx);
        }
        // 如果传入了component
        if (this.props.component) {
            const Component = this.props.component;
            // 返回组件，并将上下文传入
            return <Component {...ctx} />
        }
        // 如果上述条件都不满足，返回null
        return null;
    }

    render() {
        return (
            <ctx.Consumer>
                {this.consumerFunc}
            </ctx.Consumer>
        );
    }
}

export default Route;
```