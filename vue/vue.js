const compilerUtil = {
    getVal(vm, expr) {
        return expr.split(".").reduce((data, cur) => {
            // 将字符串转化为数组，调用数组reduce方法
            // ['message'].reducer... cur:'message'
            return data[cur];
            // 将vm.$data对应expr的值返回
        }, vm.$data);
    },
    model(node, expr, vm) { // 元素节点，表达式，vue实例对象
        let fn = this.updater["modelUpdater"];
        new Watcher(vm, expr, newVal => {
            fn(node, newVal);
        });
        let val = this.getVal(vm, expr);
        // 通过expr字符串获取vm中对应的值
        fn(node, val);
        // 将值作为value赋给input文本框
    },
    html() {},
    getContentValue(vm, expr) {
        return expr.replace(/\{\{(.+?)\}\}/g, (...args) => {
            return this.getVal(vm, args[1]);
        });
    },
    text(node, expr, vm) {
        let fn = this.updater["textUpdate"];
        let content = expr.replace(/\{\{(.+?)\}\}/g, (...args) => {
            // args[1]是正则表达式中捕获组(.+?)匹配到的字符串
            new Watcher(vm, args[1], () => {
                fn(node, this.getContentValue(vm, expr));
            });
            return this.getVal(vm, args[1]);
            // 将vm实例对象，和匹配的字符传入函数，通过字符串，找到vm.$data中对应的值返回
        });
        fn(node, content);
        // 调用函数给文本节点的文本赋对应的值
    },
    updater: {
        // 给带有v-model的元素节点（input框）value赋值
        modelUpdater(node, value) {
            node.value = value;
        },
        // 给文本节点更新值
        textUpdate(node, value) {
            node.textContent = value;
        }
    }
};
// 编译类

class Compiler {
    constructor(el, vm) {
        this.vm = vm;
        // 将vue实例对象引用赋值给this.vm
        this.el = this.isElement(el) ? el : document.querySelector(el);
        // 获取传入字符串对应的根节点，并赋值给this.el
        const fragment = this.node2fragment(this.el);
        // 拿到放到内存中等待处理的文档碎片
        this.compiler(fragment);
        // 编译处理文档碎片
        this.el.appendChild(fragment);
        // 将处理好的dom元素重新加入dom树
    }

    // 核心编译方法
    compiler(node) {
        let childNode = node.childNodes;
        [...childNode].forEach(item => {
            if (this.isElement(item)) {
                // 元素节点
                this.compilerElement(item);
                this.compiler(item);
            } else {
                // 文本节点
                this.compilerText(item);
            }
        });
    }

    // 编译元素节点
    compilerElement(node) {
        // 判断是否是带指令的元素节点
        let attr = node.attributes;
        // 取出元素特性可迭代对象
        [...attr].forEach(item => {
            // 将伪数组转化为数组，并循环取出每一个数组元素
            const {
                name,
                value: expr
            } = item;
            // 取出数组元素对象的name，value
            if (this.isDirective(name)) {
                // 如果是指令特性
                let [, directive] = name.split("-");
                // 将v-model拆分为[v,model]取model作为directive
                compilerUtil[directive](node, expr, this.vm);
                // 将元素节点，表达式，vue实例对象传入编译函数
            }
        });
    }

    // 编译文本节点
    compilerText(node) {
        let textContent = node.textContent;
        if (/\{\{(.+?)\}\}/.test(textContent)) {
            // 匹配到双括号
            compilerUtil["text"](node, textContent, this.vm);
            // 将文本节点，匹配到的括号内容，vue实例传入编译函数
        }
    }

    // 判断元素是否有指令
    isDirective(attrName) {
        return attrName.startsWith("v-");
    }

    // 将node节点，转化为文档碎片
    node2fragment(node) {
        let firstChild;
        const flag = document.createDocumentFragment();
        // 创建文档碎片
        while (firstChild = node.firstChild) {
            // 如果根节点有第一个子元素，将第一个子元素加入文档碎片中
            flag.appendChild(firstChild);
        }
        return flag;
        // 将存储元素的文档碎片返回
    }

    // 判断节点是否为元素节点
    isElement(node) {
        if (node.nodeType === 1) return true;
        // 如果节点是元素节点，返回true
    }
}

class Dep {
    constructor() {
        this.subs = []; // 存放所有watcher
    }

    // 订阅
    addSub(watcher) {
        this.subs.push(watcher); // 添加进subs数组
    }

    // 发布
    notify() {
        this.subs.forEach(watcher => {
            watcher.update();
        });
    }
}

class Watcher {
    constructor(vm, expr, cb) {
        this.vm = vm;
        this.expr = expr;
        this.cb = cb;
        // 默认存放一个老值
        this.oldValue = this.get();
    }

    get() {
        Dep.target = this; // 将Watcher赋值给Dep的静态属性target
        let value = compilerUtil.getVal(this.vm, this.expr);
        // 函数读取值调用观察者的get方法
        Dep.target = null;
        return value;
    }

    update() {
        let newValue = compilerUtil.getVal(this.vm, this.expr);
        if (newValue !== this.oldValue) {
            this.cb(newValue);
        }
    }
}



class Observe {
    constructor(data) {
        this.observe(data);
    }

    observe(data) {
        if (data && typeof data === "object") {
            for (const key in data) {
                this.defineReactive(key, data, data[key]);
            }
        }
    }

    defineReactive(key, data, value) {
        this.observe(value);
        const dep = new Dep();
        Object.defineProperty(data, key, {
            get() {
                // console.log(Dep.target);
                Dep.target && dep.addSub(Dep.target);
                // Dep.target是Watcher的实例对象
                return value;
            },
            set: (v) => {
                this.observe(v);
                value = v;
                dep.notify();
                // 设置被观察者观察的值，调用set方法，调用订阅者的发布函数，更新数据。
            }
        });
    }
}

class Vue {
    constructor(options) {
        this.$el = options.el;
        this.$data = options.data;
        if (this.$data) {
            // 数据劫持
            new Observe(this.$data);
            new Compiler(this.$el, this);
        }
    }
}