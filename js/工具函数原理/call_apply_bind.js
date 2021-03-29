Function.prototype.call = function (ctx, ...params) {
    ctx === null ? ctx = window : null;
    // 如果上下文不是对象将上下文转化为对象
    !/^(object|function)$/.test(typeof ctx) ? ctx = Object(ctx) : null;
    const key = Symbol("key");
    ctx[key] = this;
    const result = ctx[key](...params);
    delete ctx[key];
    return result;
};
Function.prototype.apply = function (ctx, params) {
    ctx === null ? ctx = window : null;
    if (!Array.isArray(params)) {
        throw new TypeError("CreateListFromArrayLike called on non-object");
    }
    // 如果上下文不是对象将上下文转化为对象
    !/^(object|function)$/.test(typeof ctx) ? ctx = Object(ctx) : null;
    const key = Symbol("key");
    ctx[key] = this;
    const result = ctx[key](...params);
    delete ctx[key];
    return result;
};

Function.prototype.Bind = function (target) {
    // 放在myBind在Function的原型上，将目标函数指向对象传入
    let self = this; // this表示调用的函数
    let Temp = function () {};
    let args = [].slice.call(arguments, 1); // 将arguments伪数组转化为真数组
    function func() { // 返回新的一个函数，this指向新的对象
        let _args = [].slice.call(arguments, 0); // 将arguments转化为真数组
        self.apply(this instanceof self ? this : target || window, args.concat(_args));
    }
    Temp.prototype = self.prototype;
    func.prototype = new Temp();
    return func;
};