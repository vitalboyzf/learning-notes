```js
function compose(...func) {
    return function (args) {
        const len = func.length - 1;
        let lastReturn = args;
        for (let i = len; i >= 0; i--) {
            // console.log(lastReturn);
            lastReturn = func[i](lastReturn);
        }
        return lastReturn;
    }
}

export default function (...middleWares) {
    return function (createStore) {
        //创建仓库
        return function (reducer, defaultState) {
            const store = createStore(reducer, defaultState);
            let dispatch = () => {
                throw new TypeError("not called display!")
            };
            //在中间件中不能调用dispatch
            const simpleStore = {
                getState: store.getState,
                dispatch: (...args) => dispatch(...args)
            }
            // 将dispatch创建函数作为数组成员返回给数组dispatchProducers
            const dispatchProducers = middleWares.map(mid => mid(simpleStore));
            dispatch = compose(...dispatchProducers)(store.dispatch);
            return {
                ...store,
                dispatch
            }
        }
    }
}
```

