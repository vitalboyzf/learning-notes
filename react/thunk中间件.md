# thunk

- thunk允许action是一个带有副作用的函数，当action分发时，thunk会阻止action继续向后移交

```jsx
//这是一个action创建函数
export function fetchUsers(){
    //如果发现返回的是函数，就不会调用下一个中间件，而是直接调用函数
    return async function(dispatch,getState,extra){
        dispatch是来自于store.dispatch(原始的dispatch)
        getState
        extra:应用中间件的使用传递参数thunk.withExtraArgument(参数);
    }
}
```

