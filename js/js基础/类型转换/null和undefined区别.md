### null typeof类型是object,undefined是undefined
### null表示没有对象，即该处不应该有值
1） 作为函数的参数，表示该函数的参数不是对象
2） 作为对象原型链的终点
### undefined表示缺少值，即此处应该有值，但没有定义
1）定义了形参，没有传实参，显示undefined
2）对象属性名不存在时，显示undefined
3）函数没有写返回值，即没有写return，拿到的是undefined
4）写了return，但没有赋值，拿到的是undefined
#### null和undefined转换成number数据类型
null 默认转成 0
undefined 默认转成 NaN

