const getProto = Object.getPrototypeOf;
const class2type = {};
const toString = class2type.toString;
const hasOwn = class2type.hasOwnProperty;
const fnToString = hasOwn.toString;
const ObjectFunctionString = fnToString.call(Object);
[
    "Boolean",
    "Number",
    "String",
    "Symbol",
    "Function",
    "Array",
    "Date",
    "RegExp",
    "Object",
    "Error",
    "GeneratorFunction"
].forEach(name => {
    class2type[`[object ${name}]`] = name.toLocaleLowerCase();
});

function toType(type) {
    // eslint-disable-next-line eqeqeq
    if (type == null) {
        return type + "";
    }
    return typeof type === "function" || typeof type === "object" ? class2type[toString.call(type)] || "object" : typeof type;
}

function isFunction(obj) {
    // 有一些浏览器dom类型用typeof检测是function
    return typeof obj === "function" && typeof obj.nodeType !== "number";
}
// 检测是否为window对象
function isWindow(obj) {
    return obj && obj === obj.window;
}
// 检测目标对象是否为数组或者类数组
function isArrayLike(obj) {
    const length = obj && "length" in obj && obj.length;
    const type = toType(obj);
    if (isFunction(obj) || isWindow(obj)) {
        return false;
    }
    return type === "array" ||
        length === 0 ||
        typeof length === "number" && length > 0 && (length - 1) in obj;
}

function isPlainObject(obj) {
    const proto = getProto(obj);
    if (!obj || toType(obj) !== "object") return false;
    // 没有原型链，可能是通过Object.create(null)创建的对象
    if (!proto) return true;
    const constructor = hasOwn.call(proto, "constructor") && proto.constructor;
    return typeof constructor === "function" && fnToString.call(constructor) === ObjectFunctionString;
}

function isEmptyObject(obj) {
    var keys = [
        ...Object.getOwnPropertyNames(obj),
        ...Object.getOwnPropertySymbols(obj)
    ];
    return keys.length === 0;
}