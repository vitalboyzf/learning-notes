## setState在原生事件,setTimeout ,setInterval中是同步的
## 在react合成事件（onClick,onChange...)中的setState是异步的，
## state = {count:0}
```js
handleClick = () =>{
 this.setState({
  count:this.state.count
},()=>{
//状态完成改变之后触发，该回调在render之后
 console.log(this.state.count);//1
})
}
```
```js
handleClick = () =>{
 this.setState({
   count:this.state.count
 })
 this.setState({
  count:this.state.count
})
 this.setState({
  count:this.state.count
})//最终的count为1
}
//会合并，得到最终的结果再去render
```

 
```js
//如果每个事件中需要同步调用setState多次，需要用函数得到最新的状态
//所有setState用到的curState可以理解为同一个，
// 下一个的curState是上一个更新后的数据，
this.setState(curState=>{
    return {
       count:this.state.count
    }
},()=>{
 console.log(this.state.count);//此时的count为两次setState执行完的数据2
})
this.setState(curState=>{
    return {
       count:this.state.count
    }
})
```
### 总结
1. 把所有的setState函数当做异步处理
2. 永远不要信任setState调用后的状态
3. 如果要使用改变后的转态，需要使用回调函数（setState的第二个参数）
4. 如果新的状态需要根据之前的状态进行运算，使用函数的方式改变状态（setState的第一个函数)
5. React会对异步的setState进行优化，将多次的setState进行合并（多次状态改变完成后，再统一
对state进行改变，然后触发render）