[TOC]

# react hook基本使用 

 - react 16.8版本出现的新特性，解决了类组件的一些问题，消除了繁琐的声明周期，使我们的开发更方便，bug出现的更少，代码更直观。【重点是前两个hook】
### useState(转态管理，功能和类组件的state类似)
 - 在函数组件的函数体中调用这个函数(useState)，参数为转态默认值，返回一个数组，数组的第一个元素为状态的值，第二个元素为一个函数，为用于改变状态的函数。

   ```js
   import React, {useState} from "react";
   
   export default function UseStateTest() {
       const [n, setN] = useState(0);
       return <>
           <div>{n}</div>
           <button onClick={() => {
               setN(1);//将n变为1
           }
           }>点击改变
           </button> 
       </>
   }
   ```

- 每次调用setN(新值)如果新值和旧的值不同，那么组件就会重新渲染，需要注意的是，如果setN()的参数直接传递一个新的值，***那么这个改变是异步的***，如果调用多次这个改变，拿到的值都是原始值。

  ```js
  export default function UseStateTest() {
      const [n, setN] = useState(0);
      return <>
          <div>{n}</div>
          <button onClick={() => {
              setN(n + 1);//n由0变为1
              setN(n + 1);//n由0变为1
              console.log(n);//0
          }
          }>点击改变
          </button>
      </>
  }
  ```

  如果想要使用最新的值，就可以将一个回调函数作为参数传入setN，函数的第一个形参为上一个改变的新的状态值，回调函数的返回值为新的状态值。

  ```js
  export default function Test() {
      const [n, setN] = useState(0);
      return <>
          <div>{n}</div>
          <button onClick={() => {
              setN(preValue => {
                  console.log(preValue);//0
                  return preValue + 1;
              })
              console.log("第一个同步打印", n);
              setN(preValue => {
                  console.log(preValue);//1
                  return preValue + 1;
              })
              console.log("第二个同步打印", n);
              setN(preValue => {
                  console.log(preValue);//2
                  return preValue + 1;
              })
              console.log("第三个同步打印", n);
          }
          }>点击改变
          </button>
      </>
  }0
  ```

  打印结果： 0

  ​                    第一个同步打印 0
  ​                    第二个同步打印 0
  ​                    第三个同步打印 0
  ​                    1
  ​                    2

  通过打印的结果和顺序可以得出结论，在dom事件中，第一个setN()会先执行，将其他setN()加入到执行队列，然后执行其他代码，再依次执行队列中的setN()，接下来每一个setN()中的回调函数的形参都是上一个setN()返回的新状态。

- 常常我们需要使用多个状态，一个组件中不相干状态分离也是符合react的设计理念，所以我们就需要在一个函数组件中调用多次useState，

- 需要注意的是，如果状态值是一个对象，那么每次改变函数的新状态值是直接替代旧的对象，而不是覆盖，这点和类组件的转态相同，所以如果需要改变状态对象的某个值时，应该先用展开运算符将之前的转态值展开，在用新的转态值覆盖之前的状态值，从而产生一个新的对象，包含原来其他状态和新的状态。

  ```js
  export default function UseStateTest() {
      const [n, setN] = useState({
          content: 'hello',
          like:'java'
      });
      return <>
          <div>{n.content}</div>
          <div>{n.like}</div>
          <button onClick={() => {
              setN({
                  ...n,
                  content: 'world'
              })
          }
          }>点击改变
          </button>
      </>
  }
  ```

- 很多人会有一个疑问，当一个函数组件使用了多个转态时，改变其中一个状态，组件重新渲染，那么其他状态为什么能够保持原来的转态数据，而不会重置。

  - 可以想象有一个附着在附件的记录表，记录所有hook的下标值和状态信息。每当使用一个useState的时候，就会增加一个记录，比如第一个记录下标值为0，转态值为默认状态，第二次使用useState增加一条记录下标值为1，转态值为默认状态，当使用setN()改变状态值后就会用新的状态值代替记录表中原有的状态值，每次重新渲染组件，也会从状态表中根据下标值获取对应转态值。
  - 这也是不能将hook放到判断语句和循环语句的原因，不仅仅useState，所有hook都不可以这样做，这样做可能会造成下标值和信息对应错乱。

- 每个useState附着在组件节点上互不影响，所以就算调用了两次这个函数组件，他们的状态值也不会共享。

### useEffect(处理副作用操作函数)
- 副作用操作指的是会对组件外部产生影响的操作。
 - 如ajax请求，计时器，更改真实dom等等。
- useEffect接受一个回调函数作为参数，接收的回调函数用来处理副作用操作，这个回调函数就是副作用函数。
   1. 副作用函数运行的时间是在页面完成ui渲染之后，他的执行是异步的不会阻塞页面。
   2. 与componentDidMount和componentDidUpDate的区别在于这两个生命周期函数运行在更新了真实dom数但用户还没有看到页面的时候，useEffect发生在用户看到页面后。
- 副作用函数可以返回一个函数，这个函数是清理函数，清理函数首次加载不会运行，更新副作用函数时运行，运行时间在副作用函数之前。
- useEffect函数可以传第二个参数，是一个数组，数据中每一个元素记录副作用函数依赖的数据，组件重新渲染后，只有依赖数据改变后，副作用函数才会重新执行。
  - 所以当传递了第二个参数依赖数据，当依赖数据不变时，
   1. 副作用函数仅在第一次渲染后执行。
   2. 清理函数仅在卸载组件后执行。
- 在副作用函数中，如果使用了函数上下文的变量，由于闭包的影响，会导致副作用函数不会实时变化。

### useContext(更优秀简洁的上下文解决方案)
```js
import React, {useContext} from "react";
const ctx = React.createContext();
function Son() {
  const value = useContext(ctx);//直接拿到父组件提供的value值。
  return <div>{value.name}</div>//渲染react
}
export default function UseStateTest() {
    return <>
        <ctx.Provider value={{name:'react'}}>
            <Son/>
        </ctx.Provider>
    </>
}
```

### 自定义hook(将一些常用的，跨越多个组件的hook功能，抽离成一个函数，这个函数就是自定义hook)

- 自定义hook更新组件，使用它的组件也会更新，可以用来封装异步请求方法，api接口。

### useCallback(固定函数地址，用于优化)

```js
import React, {useState} from "react";

class Son extends React.PureComponent {
    render() {
        console.log("Test渲染");
        return <button onClick={this.props.myClick}>点击子组件{this.props.num}</button>
    }
}

export default function Test() {
    const [n, setN] = useState(0);
    const [s, setS] = useState(0);
    console.log("父组件渲染");
    return <>
        <Son num={s} myClick={() => {
           setS(10);
        }
        } />
        <button onClick={() => {
            setN(n+1);
        }
        }>点击父组件
        </button>
    </>
}
```
- 有可能遇到上面的场景，Son为纯组件，父组件刷新后，当传入props和自身state不变时，组件不重新渲染，但是每次点击父组件按钮，传入Son的props看起来没有改变，他自身也没有state,应给不会刷新才对，但是他却刷新了，原因在于Son传入的myClick函数每次刷新父组件都会产生一个新的函数赋值给myClick，也就是props变了，所以组件会刷新。
- 如果将函数写在外面的话，setS就没办法传过去了，这样的需求useCallback就可以很好地处理了。看看下面的代码。
```js
import React, {useCallback, useState} from "react";

class Son extends React.PureComponent {
    render() {
        console.log("Test渲染");
        return <button onClick={this.props.myClick}>{this.props.num}点击子组件</button>
    }
}

export default function Test() {
    const [n, setN] = useState(0);
    const [s, setS] = useState(0);
    const handleClick = useCallback(()=>{
        setS(10);
    },[s]);
    console.log("父组件渲染");
    return <>
        <Son num={s} myClick={handleClick} />
        <button onClick={() => {
            setN(n+1);
        }
        }>点击父组件
        </button>
    </>
}
```
- useCallback()第一个参数是一个回调函数，第二个参数是一个依赖数组，返回一个函数，返回的函数就是回调函数的引用，如果依赖数组的数据不发生变化，那么返回的就永远是同一个函数的引用，这样就可以完美解决上面的问题。

### useMemo(保持不需要重新计算的稳定数据，用于性能优化)

- 用法类型于useCallback，不同的是回调函数里返回的内容是需要记忆的内容

```js
    const handleClick = useMemo(()=>{
        return ()=>{
            setS(10);
        }
    },[s]);
```
上面的固定函数可以写成如上代码，效果相同，由于useMemo返回值记忆的是return返回的值，所以这个hook有更多的应用场景，固定各种类型的变量。只要一赖数据不变，返回的值的引用就不变，可以将不需要的计算放到useMemo的第一个参数回调函数当中。(有点像vue的computed计算属性)

### useRef(多个对象同一个引用，性能优化)
- 调用这个函数，返回一个对象{current:undefined},如果调用useRef时传一个参数，则返回对象的current的值为那个参数。
- 如果使用React.creatRef由于每一次函数组件重新渲染都会重新创建一个新的ref,对性能有一些影响，使用useRef无论重新调用函数多少次，使用的都是同一个返回值ref
- 利用useRef同一引用值这个特性写个倒计时
```js
import React, {useEffect, useRef, useState} from "react";

export default function UseStateTest() {
    const [n, setN] = useState(10);
    const val = useRef(n);
    useEffect(() => {
        const timer = setInterval(() => {
            setN(val.current--);
            if (val.current === 0) {
                clearInterval(timer);
            }
        }, 500);
    }, [])
    return <div>
        {n}
    </div>
}
```
- 由于每一次都使用同一个val引用，所以每次重新渲染函数都使用同一个引用。

### useLayoutEffect(作用和useEffect相同)。【**不常用**】
- 差别在于副作用函数运行的时间点，useLayoutEffect在dom构建完成，但还没有渲染ui页面的时候运行，和生命周期函数componentDidMount和componentDidUpdate函数运行的时间点差不多。应该尽量使用useEffect，因为这个hook不会阻塞ui页面，如果有特殊需求，再考虑使用useLayoutEffect。
### useImperativeHandle这个hook用于使用ref调用函数组件的方法。【**不常用**】

```javascript
import React, {useEffect, useImperativeHandle, useRef} from "react";
function Test(props,ref) {
   useImperativeHandle(ref,()=>{
       return{//返回的数据作为ref current:的值
           method(){
               console.log("methods");
           }
       }
   },[])
    return <h1>h</h1>
}
const NewTest = React.forwardRef(Test);
export default function UseImperativeHandle() {
    const ref = useRef();
    useEffect(()=>{
        console.log(ref.current);
    })
  return <NewTest ref={ref}/>
}
```



### useDebugValue 用于自定义hook的关联数据显示到调试栏。如果创建的自定义hook通用性比较高，可以使用这个hook方便调试。【**不常用**】

  

  