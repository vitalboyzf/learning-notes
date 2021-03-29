### css提取 mini-css-extract-plugin

* 中文文档：https://webpack.docschina.org/plugins/mini-css-extract-plugin/#root

### css压缩 css-minimizer-webpack-plugin。

* 原文文档：https://webpack.js.org/plugins/css-minimizer-webpack-plugin/#root

### html生成 html-webpack-plugin。

* 原文文档：https://github.com/jantimon/html-webpack-plugin#options

### 清理输出目录：clean-webpack-plugin

* 中文文档 https://webpack.docschina.org/guides/output-management/#cleaning-up-the-dist-folder

``` js
  new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ["**/*", "!dll", "!dll/*"]
  }),
```

### 复制静态资源文件 copy-webpack-plugin

* 原文文档：https://webpack.docschina.org/plugins/copy-webpack-plugin/#filter

### webpack5内置了静态资源构建能力，不需要安装其他的loader, 如下，满足test规则的资源就可以放到assets文件夹下面

 - 原文文档：https://webpack.js.org/guides/asset-modules/#custom-data-uri-generator

``` js
module.exports = {
    ...,
    module: {
        rules: [{
            test: /\.(png|jpg|svg)$/,
            type: "assets/inline",
            generator: {
                // [ext]前面自带.
                filename: "assets/[contenthash:5].[name][ext]"
            }
        }]
    }
}
```

### type取值

* asset/source  功能相当于row-loader, 将文件处理成一个字符串导入
* asset/inline 功能相当于url-loader，当文件大小达到一定要求的时候，可以将其处理成 base64 的 URIS ，内置 file-loader
* asset/resource 功能相当于file-loader (最通用的方式)将文件打包导到输出目录，并在 import 的时候返回一个文件的 URI
* asset 默认会根据文件大小来选择哪种类型，当文件小于8kb使用asset/inline，否则使用asset/resource


