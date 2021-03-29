### ref 用于获取类组件实例对象，或者元素dom对象，不能用于函数组件。
1- componentDidMount的生命周期以后可以使用ref
2- 如果刷新页面ref的函数发生了改动（旧的函数会被新的函数替代），分别调用旧的函数和新的函数，时间点在componentDidUpdate
之前（旧的函数被调用时，传递null,新的函数被调用时，传递新的对象。可以将函数写在原型上，避免重复调用。
3- 尽量不要用ref
4- ref转发，使用newComp = React.createRef(函数组件);
 在函数组件的第二个参数可以接收到<newComp ref={(el)=>this.ref=el}/>的ref,并可以赋值给自己的元素。