1. loader本身是一个函数。

   ```js
   module.exports = function(sourceCode){
       //根据sourceCode传入的代码，经过一系列的处理
       return "新的处理代码"
       //最后由新的代码进行抽象语法树分析
   }
   ```

   

处理loader的时间点在webpack读取文件内容和进行抽象语法数分析之间进行的

2. loader配置。

   ```js
   module.exports = {
       module:{//模块配置
           rules:[//规则配置
            {
                test:/index\.js&/,//正则表达式，匹配模块的规则
                use:[//使用加载器
                   {//每个加载器是一个对象
                    loader:'使用的加载器的路径'//每一个加载器会被webpack,require调用
                   }
                ]
                //use:["加载器1","加载器2"]，如果不需要options,可以简化写成这样
            }//每一条匹配规则   
           ]
       }
   }
   ```

    **注意：**

   - *loader*是从后往前使用的

   use:["loader1","loader2"]

   先调用loader1将返回结果代码传给loader1，再将loader1的代码进行抽象语法树分析

   - 如果多条规则都匹配到了，将加载器按照先后顺序加入加载器数组,从后往前调用

     

     处理图片常用loader :
     
     file-loader //输出文件夹
     
     url-loader//base64编码，适合小文件
     
     