[TOC]

# Redux

## Action基础用法

1. action是一个plain-object(平面对象) - 它的__proto__指向Object.prototype
2. 它的属性必须有一个type,表示描述操作的类型，type的值并没有要求，可以是字符串，可以是数字，或者符号。
3. 在大型项目中，为了防止硬编码(hard code),会将action的类型存放到一个或一些单独的文件中（样板代码）
4. 为了方便传递action通常会使用action创建函数（action creator)来创建action
   - action创建函数应为无副作用的纯函数，不能改变参数，不能有异步，不能改变外面环境的数据
5. 为了方便利用action创建函数来分发action，redux提供了一个函数**bindActionCreator**该函数用于增强action创建函数的功能，第一个参数传递action创建函数模块对象，第二个参数是一个dispatch
- 创建一个action-type文件定义所需类型
```js
export const INCREASE = Symbol('increase');
export const DECREASE = Symbol('decrease');
export const SETNUMBER = Symbol('setNumber');
```
- 创建一个action创建函数文件number-action,用于导出action
```js
import * as actionType from './action-type';
export function getIncrease() {
    return {
        type: actionType.INCREASE
    };
}
export function getDecrease() {
    return {
        type: actionType.DECREASE
    };
}
export function setNumber(newNumber) {
    return {
        type: actionType.SETNUMBER,
        payload: newNumber
    };
}
```
- 创建redux仓库操作action
```js
import {createStore} from "redux";
import * as actionType from './action-type';
import * as numberAction from './number-action';
function reducer(state, action) {
    if (action.type === actionType.INCREASE) {
        return state + 1;
    } else if (action.type === actionType.DECREASE) {
        return state - 1;
    }else if (action.type === actionType.SETNUMBER){
        return  action.payload;
    }
    else {
        return state;
    }
}
const store = createStore(reducer,10);
console.log(store.getState());//10
store.dispatch(numberAction.getIncrease());
console.log(store.getState());//11
store.dispatch(numberAction.setNumber(23));
console.log(store.getState());//23
```
###  bindActionCreator用法
```js
import {createStore,bindActionCreators} from "redux";
import * as actionType from './action-type';
import * as numberAction from './number-action';
function reducer(state, action) {
    if (action.type === actionType.INCREASE) {
        return state + 1;
    } else if (action.type === actionType.DECREASE) {
        return state - 1;
    }else if (action.type === actionType.SETNUMBER){
        return  action.payload;
    }
    else {
        return state;
    }
}
const store = createStore(reducer,10);
const actionCreators = bindActionCreators(numberAction,store.dispatch);
actionCreators.getIncrease();
console.log(store.getState());//11
actionCreators.getDecrease();
console.log(store.getState());//10
actionCreators.setNumber(123);
console.log(store.getState());//123
```
## store
- 用于保存数据
- 通过createState方法创建该对象成员
 - dispatch分发action
 - getState获取当前仓库状态
 - subscribe：注册一个监听器，每当dispatch分发action就会运行注册的监听器，该函数会返回一个函数，调用这个函数取消监听器
## createStote源码实现
```js
function isPlainObject(obj) {//判断函数 obj是否为平面函数
    if (typeof obj !== 'object') {
        return false;
    }
    return Object.getPrototypeOf(obj) === Object.prototype;
}

function getRandomString(len) {//获取一个随机字符串 长度为len
    return Math.random().toString(36).substr(2, len).split("").join(".");
}

export function createStore(reducer, defaultState, enhancer) {

    if (typeof defaultState === 'function') {
        enhancer = defaultState;
        defaultState = undefined;
    }
    // 如果enhancer是函数，说明它是中间件应用函数applyMiddleware
    if(typeof enhancer === 'function'){
        enhancer(createStore)(reducer,defaultState);
    }
    // const store = createStore(reducer, applyMiddleware(middleware1, middleware2));
    let currentReducer = reducer,
        currentState = defaultState;
    let listeners = [];//监听器数组

    function dispatch(action) {
        // 如果action不是一个平面对象
        if (!isPlainObject(action)) throw new TypeError("action is not a plain object");
        // 如果action对象没有type属性
        if (action.type === undefined) throw new TypeError("action 没有传type属性");
        //将当前状态值作为参数传给reducer，将reducer函数执行后的返回值给当前状态值。
        currentState = currentReducer(currentState, action);
        // 循环监听器数组
        for (let listener of listeners) {
            //遍历执行侦听器数组函数
            listener();
        }
    }
    function getState() {
        //将当前转态值返回
        return currentState;
    }

    function subscribe(listener) {
        listeners.push(listener);//向侦听器数组添加函数元素
        let isRemove = false;//将是否移除初始化为false
        // 返回一个取消监听函数
        return function () {
            //如果已经删除，直接返回，提高效率
            if (isRemove) {
                return;
            }
            const index = listeners.indexOf(listener);//获取当前加入函数元素的下标索引
            listeners.splice(index, 1);//将函数元素从数组清除
            isRemove = true;//删除后将标记变成true
        }
    }
    //状态初始化
    dispatch({
        type: `@@redux/INIT${getRandomString(7)}`
    })
    return {
        getState,//获取状态值函数
        dispatch,//分发action函数
        subscribe//侦查器创建函数
    }
}
```
## bindActionCreators 原理实现
```js
export default function (actionCreator, dispatch) {
    if (typeof actionCreator === 'function') {
        //如果action创建函数是一个函数，直接返回自动分发的函数。
        return getAutoDispatchActionCreator(actionCreator, dispatch);
        //如果actionCreator创建函数是一个对象
    } else if (typeof actionCreator === 'object') {
        //创建一个新的对象，用于返回值调用。
        const result = {};
        //循环遍历actionCreator对象，取出对象的每一个属性名key
        for (let key in actionCreator) {
                //actionCreator的属性名必须是一个函数，如果不是函数不处理。  
            if (typeof actionCreator[key] === 'function') {
                //将actionCreator属性名放到返回对象result中，属性名为自动分发的函数，可以通过result调用函数分发action
                result[key] = getAutoDispatchActionCreator(actionCreator[key], dispatch);
            }
        }
        //将对象返回
        return result;
    } else {
        //如果不是对象也不是函数直接报错。
        throw new TypeError("must be object or function");
    }
}
//自动分发action函数        传入action创建函数，store.dispatch
function getAutoDispatchActionCreator(actionCreator, dispatch) {
    return function (...args) {
        //将函数返回，返回的函数调用会直接分发action
        //执行返回函数时传入的参数
        const action = actionCreator(...args);
        dispatch(action);//分发action
    }
}
```
## combineReducer 源码实现
```js
// 判断是否为平面对象
function isPlainObject(obj) {
    if (typeof obj !== "object" || obj === null) return false;
    let proto = obj;
    while (Object.getPrototypeOf(proto)) {
        proto = Object.getPrototypeOf(proto);
    }
    return proto === Object.getPrototypeOf(obj);
}
// 获取length长度的随机字符串每个字符用.分割
function getRandomString(length) {
   return Math.random().toString(36).substr(2,length).split("").join(".");
}

const ActionType = {
    INIT(){
        return `@@redux/INIT${getRandomString(6)}`
    },
    UNKNOWN(){
        return `@@redux/PROBE_UNKNOWN_ACTION ${getRandomString(6)}`
    }
}
function validateReducer(reducers) {
    if (typeof reducers !== "object") {
        throw new TypeError("reducers must be a object");
    }
    if (!isPlainObject(reducers)) {
        throw new Error("reducers must be a plain object");//reducer不是一个平面对象
    }
    // 循环reducers对象
    /*
    combineReducer({
       reducer1:reducer函数,
       reducer2:reducer函数
    })
    */
    for (const key in reducers) {
        if (reducers.hasOwnProperty(key)) {
            // 拿到对应key值的reducer函数
            const reducer = reducers[key];
            // 测试代码
            let state = reducer(undefined, {
                type: ActionType.INIT()
            })
            if (state === undefined) {
                throw new Error("reducer must not return undefined")
            }
            state = reducer(undefined, {
                type: ActionType.UNKNOWN()
            })
            if (state === undefined) {
                throw new Error("reducer must not return undefined")
            }
        }
    }
}
// 核心代码
export default function (reducers) {
    // 验证reducer
  validateReducer(reducers);
    // 返回一个总的reducer
  return function (state = {},action ) {
      // 创建返回结果的对象
      let newState= {};
     /*
     combineReducer({
       reducer1:reducer函数,
       reducer2:reducer函数
    })
    */
      // 循环reducers对象
      for(const key in reducers){
          if(reducers.hasOwnProperty(key)){
                // 拿到对应key值的reducer函数
              const reducer = reducers[key];
              // 返回结果对象的key(reducer1)对应的值为执行reducer函数后reducer返回的结果
              // 传入起始的state[key]
              newState[key] = reducer(state[key],action)
          }
      }
    // 返回对象
   return newState;
  }
}
```
