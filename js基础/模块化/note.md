### require 是依赖延迟声明，执行到它所在的位置，才会执行引入依赖，可以配合if
### es6 使用依赖预声明
  - 预声明优点：在一开始就确定模块依赖关系
  - 预声明缺点：有些情况下效率比较低
  - es6模块化具有灵活的导入导出方法
  - 规范的路径表示法，所有路径必须./或者../开头
### es6导出方法
1. 基本导出
 ```js
 export const a = 1//导出一个a值为1 ，类似于commonJS中的export.a = 1
 export function test(){}//导出一个名字为test的函数，类似于commonJS中的exports.test
 export {具名符号}
 let name = 'zf'
 export {name} //将name变量作为导出的名，zf作为导出的值  相当于export let name = 'zf'
 ```
 ***由于基本导出必须有名字，所以要求导出内容必须跟上声明表达式或者具名符号***
2. 基本导入
```js
import {导入的符号列表} from "路径"
导出的时候可以用as关键字给导入的符号重命名
import {a as b} from "路径" //导入a符号，重新命名为b
//导入的符号，不可改
```
 - 如果想要拿到所有符号，可以用【* as 对象名】将导出的包装成一个Module对象
 ```js
 import * as obj from "路径"
 //此时obj对象包含目标路径所有基本导出的符号
 ```
 - 如果只是想执行以下模块，不导入目标模块的内容：***import "路径"*** 可以实现