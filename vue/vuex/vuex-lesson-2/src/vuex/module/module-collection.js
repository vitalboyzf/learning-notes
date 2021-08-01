import { forEachValue } from "../utils";
import Module from "./module";
// 格式化用户的参数，实现根据自己的需要，后续使用时方便
// root = {
//     _raw:rootModule,
//     state:rootModule.state, // 用户管理 
//     _children:{
//         aCount:{ // > 1
//             _raw:aModule,
//             state:aModule.state,
//             _children:{ // > 1
//                 cCount:{
//                     _raw:useCssModule,
//                     state:cModule.state,
//                     _children:{}
//                 }
//             }
//         },
//         bCount:{
//             _raw:bModule,
//             state:bModule.state,
//             _children:{}
//         }
//     }
// }
export default class ModuleCollection {
    constructor(rootModule) {
        this.root = null;
        this.register(rootModule, []); // root => a b  a=>c
    }
    register(rawModule, path) {
        // 创建一个新模块
        const newModule = new Module(rawModule);
        // 如果路径为0，表示这是一个根模块
        if (path.length === 0) { 
            this.root = newModule;
        } else {
            // 找到[a,b,c]，路径中的[a,b]，并找到b作为父模块，将新模块挂载
            const parent = path.slice(0, -1).reduce((module, current) => {
                return module.getChild(current);
            }, this.root);
            // 将新模块添加到父模块中
            parent.addChild(path[path.length - 1], newModule);
        }
        // 如果存在子模块，循环子模块，递归注册
        if (rawModule.modules) {
            forEachValue(rawModule.modules, (rawChildModule, key) => {
                this.register(rawChildModule, path.concat(key));
            });
        }
        return newModule;
    }
    // 根据路径获取命名空间
    getNamespaced(path) {
        let module = this.root; // [a,c] a/c
        return path.reduce((namespaceStr, key) => {
            module = module.getChild(key); // 子模块
            return namespaceStr + (module.namespaced ? key + "/" : "");
        }, "");
    }
}