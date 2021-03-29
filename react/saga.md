# saga
 - 中文文档：https://redux-saga-in-chinese.js.org/
 - 特点 ：纯净，强大，灵活
## 基础使用
1. 下载saga包  redux-saga
2. 引入saga创建函数
```js 
 import createSagaMiddleware from 'redux-saga'
 const sagaMid = createSagaMiddleware();//创建一个saga中间件
```
3. saga任务函数是一个生成器函数，将生成器函数放入sagaMid.run(saga任务函数)启动任务
4. 在saga任务中，如果yield一个普通数据，saga不做任何处理，仅仅将传递给yield表达式（把得到的数据放到next的参数中），因此，在saga中，yield一个普通数据没有意义。
5. 需要在yield后面放上一些合适的saga指令（saga effect)，如果放置的是指令，saga中间件会做出特殊的处理。
6. 每个指令本质上是一个函数，该函数被调用后，返回一个指令对象，saga会接收到该指令对象，进行处理。
7. saga指令 导入 **import {指令} from "redux-saga/effects"** 
8. 一旦saga任务完成（生成器函数完成），则saga中间件一定结束
 - take[阻塞]：监听某个action的type如果action发生了，则会进行下一步处理，take指令仅监听一次，yield监听的是完整的action对象
 ```js
 import {countActionType} from "../action/countAction";
 import {take} from 'redux-saga/effects'
 export default function* () {
  const action = yield take(countActionType.increaseType);
  console.log(action);//countActionType.increaseType对应的action发生了，执行这段代码，action是发生的action
}
 ```
### 常用指令
 -  - all【阻塞】：该函数传入一个数组，数组中方法生成器，saga会等所有的生成器全部完成后，才会进行下一步处理
 ```js
import {all} from 'redux-saga/effects'
import count from "./count";//一个生成器函数
import student from "./student";//一个生成器函数

export default function* () {
    yield all([count(), student()]);//调用生成器函数
    console.log("都执行完事了");
}
 ```
 - takeEvery：不断监听某个type类型的action，当监听的action发生，运行一个函数，takeEvery永远不会结束当前生成器
  ```js
export function * decrease() {
   yield takeEvery(countActionType.decreaseType,()=>{
          console.log("监听到了decreaseType对应的action发生");
   })
  console.log("listening action...");
}
  ```
- delay:【阻塞】阻塞指定的毫秒数
- put:用于重新触发action，相当于dispatch
- call：【如果回调函数是promise阻塞】传入一个异步函数（不执行）
 写法一：yield call(异步函数，参数1，参数2)
 写法二：如果要绑定this yield call([this,异步函数])
 写法三：yield call({
 context:this指向,
 fn:异步函数
 })
- apply yield apply(this指向,指向函数,[参数])
- select:用于获取当前仓库的数据 select(state(仓库数据)=>进行过滤)类似于filter
- cps:【可能阻塞】用于处理传统回调的异步函数


