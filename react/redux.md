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
    if(typeof enhancer === 'function'){
        return enhancer(createStore)(reducer,defaultState);
    }
    // const store = createStore(reducer, applyMiddleware(middleware1, middleware2));
    let currentReducer = reducer,
        currentState = defaultState;
    let listeners = [];//监听器数组

    function dispatch(action) {
        if (!isPlainObject(action)) throw new TypeError("action is not a plain object");
        if (action.type === undefined) throw new TypeError("action 没有传type属性");
        currentState = currentReducer(currentState, action);//将reducer函数执行后的返回值给当前状态值。
        //将当前状态值作为参数传给reducer
        for (let listener of listeners) {
            listener();//遍历执行侦听器数组函数
        }
    }

    function getState() {
        return currentState;//将当前转态值返回
    }

    function subscribe(listener) {
        listeners.push(listener);//向侦听器数组添加函数元素
        let isRemove = false;//将是否移除初始化为false
        return function () {
            if (isRemove) {
                return;//如果已经删除，直接返回，提高效率
            }
            const index = listeners.indexOf(listener);//获取当前加入函数元素的下标索引
            listeners.splice(index, 1);//将函数元素从数组清除
            isRemove = true;//删除后将标记变成true
        }
    }

    dispatch({
        type: `@@redux/INIT${getRandomString(7)}`
    })//状态初始化
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
    } else if (typeof actionCreator === 'object') {
        //如果actionCreator创建函数是一个对象
        const result = {};
        //创建一个新的对象，用于返回值调用。
        for (let key in actionCreator) {
            //循环遍历actionCreator对象，取出对象的每一个属性名key
            if (typeof actionCreator[key] === 'function') {
                //actionCreator的属性名必须是一个函数，如果不是函数不处理。
                result[key] = getAutoDispatchActionCreator(actionCreator[key], dispatch);
                //将actionCreator属性名放到返回对象result中，属性名为自动分发的函数，可以通过result调用函数分发action
            }
        }
        return result;//将对象返回
    } else {
        //如果不是对象也不是函数直接报错。
        throw new TypeError("must be object or function");
    }
}

function getAutoDispatchActionCreator(actionCreator, dispatch) {//传入action创建函数，store.dispatch
    //自动分发action函数
    return function (...args) {
        //将函数返回，返回的函数调用会直接分发action
        const action = actionCreator(...args);//执行返回函数时传入的参数
        dispatch(action);//分发action
    }
}
```
## combineReducer 源码实现
```js
function isPlainObject(obj) {
    if (typeof obj !== 'object') return;
    return Object.getPrototypeOf(obj) === Object.prototype;
}
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
        throw new TypeError("reducer is not a object");
    }
    if (!isPlainObject(reducers)) {
        throw new Error("reducers is not a plain object");//reducer不是一个平面对象
    }
    for (const key in reducers) {
        if (reducers.hasOwnProperty(key)) {
            const reducer = reducers[key];
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
export default function (reducers) {
  validateReducer(reducers);
  return function (state = {},action ) {
      let newState= {};
      for(const key in reducers){
          if(reducers.hasOwnProperty(key)){
              const reducer = reducers[key];
              newState[key] = reducer(state[key],action)
          }
      }
   return newState;
  }
}
```
