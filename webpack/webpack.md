[toc]
### webpack与rollup、gulp的不同？
- **gulp**是基于任务和流（Task、Stream）找到一个文件，对其做一系列链式操作，更新流上的数据， 整条链式操作构成了一个任务，多个任务就构成了整个web的构建流程。
- **webpack**是基于入口的。webpack会自动地递归解析入口所需要加载的所有资源文件，然后用不同的Loader来处理不同的文件，用Plugin来扩展webpack功能。
- **rollup**专注于js,适用于不去考虑样式资源的打包js类库，工具库
与webpack类似的工具还有哪些？谈谈你为什么最终选择（或放弃）使用webpack？

### 有哪些常见的Loader？他们是解决什么问题的？
- file-loader：把文件输出到一个文件夹中，在代码中通过相对 URL 去引用输出的文件
有哪些常见的Plugin？他们是解决什么问题的？
- url-loader：但是能在文件很小的情况下以 base64 的方式把文件内容注入到代码中去，如果文件过大，则使用file-loader处理成输出文件
- babel-loader：处理js兼容性
- css-loader：处理.css文件
- style-loader：js生成style标签，将css文件内容放到style标签中，并将style标签添加到html文件的head中
### 有哪些常见的Plugin？他们是解决什么问题的？
- html-webpack-plugin
- clean-webpack-plugin
- copy-webpack-plugin
- mini-css-extract-plugin
### Loader和Plugin的不同？
- **Loader**直译为"加载器"。Webpack将一切文件视为模块，但是webpack原生是只能解析js文件，如果想将其他文件也打包的话，就会用到loader。 所以Loader的作用是让webpack拥有了加载和解析非JavaScript文件的能力。
- **Plugin**直译为"插件"。Plugin可以扩展webpack的功能，让webpack具有更多的灵活性。 在 Webpack 运行的生命周期中会广播出许多事件，Plugin 可以监听这些事件，在合适的时机通过 Webpack 提供的 API 改变输出结果。

### webpack的构建流程是什么?从读取配置到输出文件这个过程尽量说全
整体过程大概分为三个步骤：初始化，编译，输出
#### 初始化
webpack将**cli参数，配置文件，默认配置**进行融合，形成一个最终的配置对象
#### 编译
1. **创建chunk**
- chunk是webpack内部构建过程中的一个概念，它表示通过某个如果找到的所有依赖的统称，根据入口模块创建一个chunk
- 每个chunk都至少有两个属性
	- name： 默认为main
	- id：唯一编号，开发环境和name相同，生成环境是一个数字，从0开始
2. **构建所有依赖模块**
![](assets/2020-01-13-09-35-44.png)
- 进入入口模块，读取文件内容
- 检查记录
- loaders处理
- 对文件内容进行语法分析
- 记录依赖，将依赖的相对路径保存到dependencies数组中["./src/index.js","./src/a.js"]
- 将依赖函数(import/require)替换为_webpack_require_
- 保存转化后的代码，放到**chunk**的模块记录中，每个模块id(模块路径)对应一个函数（转化后的代码）
- 根据dependencies中的依赖记录，根据上面过程递归加载其他模块
3. **产生chunk assets**(chunk id对应一个立即执行函数)
![](assets/2020-01-09-12-39-16.png)
- 在第二步完成后，chunk中会产生一个模块列表，列表中包含了**模块id**和**模块转换后的代码**
- 接下来，webpack会根据配置为chunk生成一个资源列表，即```chunk assets```，资源列表可以理解为是生成到最终文件的文件名和文件内容
- 产生chunk hash
4. **合并chunk assets**
![](assets/2020-01-09-12-47-43.png)
- 将多个chunk的assets合并到一起，并产生一个总的hash
#### 输出
- webpack将利用node中的fs模块（文件处理模块），根据编译产生的总的assets，生成相应的文件。
#### 总过程
![](assets/2020-01-09-15-51-07.png)
**涉及术语**

1. module：模块，分割的代码单元，webpack中的模块可以是任何内容的文件，不仅限于JS
2. chunk：webpack内部构建模块的块，一个chunk中包含多个模块，这些模块是从入口模块通过依赖分析得来的
3. bundle：chunk构建好模块后会生成chunk的资源清单，清单中的每一项就是一个bundle，可以认为bundle就是最终生成的文件
4. hash：最终的资源清单所有内容联合生成的hash值
5. chunkhash：chunk生成的资源清单内容联合生成的hash值
6. chunkname：chunk的名称，如果没有配置则使用main
7. id：通常指chunk的唯一编号，如果在开发环境下构建，和chunkname相同；如果是生产环境下构建，则使用一个从0开始的数字进行编号
### 是否写过Loader和Plugin？描述一下编写loader或plugin的思路？

- **loader**的功能定位是转化代码
本质是一个函数,将源码字符串作为参数传给loader函数,经过loader处理后，返回的字符串，再交给抽象语法数分析
```js
module.exports = (sourceCode) => {
    return sourceCode.replace(/变量/g, "const");
}; 
```
- **plugins**的功能是做loader做不了的事，本质是一个带有apply方法的对象，通常写成类 

```js
module.exports = class MyPlugin{
	apply(compiler){
	// 注册这个插件后，初始化时，apply方法被调用，watch修改代码，apply不会再被调用
	// 这个位置用于注册事件
	compiler.hooks.事件名.事件类型(name,function(compilation){
	// 事件处理函数
	})
	}
}
```
- 插件编写，向一个文件写入chunk名称和大小
```js
module.exports = class FileListPlugin {
    constructor(filename = "filelist.txt") {
        this.filename = filename;
    }
    apply(compiler) {
        // 注册钩子函数
        compiler.hooks.emit.tap("FileListPlugin", completion => {
            const fileList = [];
            // 遍历资源列表，拿到每一个chunk
            for (const key in completion.assets) {
                // key为chunk名
                var content = `【${key}】
                    大小：${completion.assets[key].size() / 1000}KB`;
                fileList.push(content);
            }
            const fileStr = fileList.join("\n\n");
            // 给资源列表添加一个输出文件，名字为filename
            completion.assets[this.filename] = {
                // 返回值为这个文件的内容
                source() {
                    return fileStr;
                },
                // 这个文件的大小
                size() {
                    return fileStr.length;
                }
            };
        });
    }
};
```

### webpack的热更新是如何做到的？说明其原理？

- 使用webpackk-dev-server时，如果不开启热替换，当代码改动，webpack会重新打包，浏览器重新请求所有资源，并执行代码
- 热替换不能降低构建时间，但能改动代码改动到效果呈现的时间
- 开启热替换后，代码改动，webpack重新打包，浏览器仅请求修改的资源

- 开启热替换

   1. 在devServer添加配置项hot:true

   2. 更改代码

```js
     if(module.hot){
      	module.hot.accept()
      }
```
- 热替换流程
	1. serve端监听到代码修改，通过webSocket管道通知浏览器
	2. 浏览器通过jsonp请求获取修改的内容
	3. 将修改的内容替换，重新执行一遍修改后的代码

如何利用webpack来优化前端性能？（提高性能和体验）
1. 压缩代码，删除多余的代码，注释、简化代码的写法
2. 多入口情况下，提取重复代码进行分包
3. 通过externals配置来提取常用库
4. 使用Tree-shaking

怎么配置多页应用？
1. 将公共代码抽离出来，避免重复的加载。
2. 随着业务的不断扩展，页面可能会不断的追加，所以一定要让入口的配置足够灵活，避免每次添加新页面还需要修改构建配置



