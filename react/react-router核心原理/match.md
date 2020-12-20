## 实现match
 - 依赖path-to-regexp库，这个库可以将path规则转化为正则表达式
```js
import {pathToRegexp} from "path-to-regexp";

export default function mathPath(path, pathname, options) {
    // 用于保存keys
    // keys结构 => [{modifier: "",
    // name: "id",
    // pattern: "[^\/#\?]+?",
    // prefix: "/",
    // suffix: ""
    //}]
    const keys = [];
    // 将path路径匹配方式转化为正则表达式
    const regExp = pathToRegexp(path, keys, getOptions(options));
    // 路径匹配方式对应匹配到的pathname
    // result => ["/user/34", "34", index: 0, input: "/user/34", groups: undefined]
    let result = regExp.exec(pathname);
    // 如果没有匹配到结果，直接返回null
    if (!result) return null;
    // 将匹配到的结果数组去掉多余元素  ["/user/34", "34"]
    let groups = Array.from(result);
    // 截取所有动态路由匹配的数组元素 ["34"]
    groups = groups.slice(1);
    // 根据函数获取{id:xxx}这样的对象键值对 xxx为/:id匹配到的值

    const params = getParams(groups, keys);
    return {
        isExact: pathname === result[0],// 如果pathname和匹配到的路径结果相同，则是精确匹配
        params,// {id:xxx}这样的对象键值对
        path,// 传入的路径匹配方式
        url: result[0]// 匹配到的路径
    };
}

// 合并配置对象
function getOptions(options = {}) {
    // 默认配置
    const defaultOptions = {
        exact: false,
        sensitive: false,
        strict: false
    };
    // 合并后的配置
    const newOption = {...defaultOptions, ...options};
    return {
        //是否大小写敏感
        sensitive: newOption.sensitive,
        //是否严格匹配最后一个/
        strict: newOption.strict,
        //是否精确匹配路径
        end: newOption.exact
    };
}

// groups => ["34"] keys => [{name:"id"}]
function getParams(groups, keys) {
    // 创建一个返回结果的对象
    const obj = {};
    // 循环数组 groups和keys的长度相同
    for (let i = 0; i < groups.length; i++) {
        // obj["id"] = 34
        obj[keys[i].name] = groups[i];
    }
    // 返回结果
    return obj;
}

```