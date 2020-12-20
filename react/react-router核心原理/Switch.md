## Switch
```js
import React, {Component} from 'react';
import ctx from './RouterContext'
import mathPath from "./matchPath";
import Route from "./Route";
class Switch extends Component {
    getMatchChild=({location})=>{
        // 创建一个数组对象，统一处理children
        let array = [];
        // 如果传入的children有多个则为数组
        if(Array.isArray(this.props.children)){
            // 直接将数组赋值给 array
            array = this.props.children;
            // 如果不是数组类型为object，是单个元素节点
        }else if(typeof this.props.children === 'object'){
            // children放入数组中
            array = [this.props.children];
        }
        // 循环array，得到每一个Route
        for (const child of array) {
            // 如果元素的类型不是Route，直接抛出异常
            if(child.type!==Route){
                throw new TypeError("Switch中只能包含Route类型组件");
            }
            
            const {path='/',exact=false,sensitive=false,strict=false} = child.props;
            const result = mathPath(path,location.pathname,{
                exact,
                sensitive,
                strict
            })
            // 如果匹配了，直接返回第一个匹配的Route组件
            if(result){
                return child;
            }
        }
    }
    render() {
        return (
            <ctx.Consumer>
                {this.getMatchChild}
            </ctx.Consumer>
        );
    }
}

export default Switch;
```