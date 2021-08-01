// 实现 new Proxy(target,handler)
// 拦截获取功能
import {
    hasOwn,
    isIntegerKey,
    isObject
} from "./share.js";
import {
    reactive,
    readonly
} from "./reactive.js";
import {
    track,
    trigger
} from "./effect.js";
// 拦截读取功能
function createGetter(isReadonly = false, shallow = false) {
    return function get(target, key, receiver) {
        const res = Reflect.get(target, key, receiver);
        // 读到可以修改的值
        if (!isReadonly) {
            // 收集依赖
            track(target, "GET", key);
        }
        // 如果是浅层代理，直接返回结果，如果结果是对象也不用深层代理了
        if (shallow) {
            return res;
        }
        // 如果获取的是对象类型，懒递归继续深度代理
        if (isObject(res)) {
            return isReadonly ? readonly(res) : reactive(res);
        }
        return res;
    };
}

// 拦截设置功能
function createSetter(shallow = false) {
    return function set(target, key, value, receiver) {
        console.log("设置");
        const oldValue = target[key];
        // 判断对象是否有这个属性，如果对象是数组，则判断key是否越界
        let hasKey = Array.isArray(target) && isIntegerKey(key) ? Number(key) < target.length : hasOwn(target, key);
        if (!hasKey) {
            // 新增
            trigger(target, "ADD", key, value);
        } else if (oldValue !== value) {
            // 修改
            trigger(target, "SET", key, value, oldValue);
        }
        return Reflect.set(target, key, value, receiver);
    };
}

const get = createGetter();
const shallowGet = createGetter(false, true);
const readonlyGet = createGetter(true);
const shallowReadonlyGet = createGetter(true, true);

const set = createSetter();
const shallowSet = createSetter(true);

export const mutableHandlers = {
    get,
    set
};
export const shallowReactiveHandlers = {
    get: shallowGet,
    set: shallowSet
};
const readonlyObj = {
    set(target, key) {
        console.warn(`set key ${key} failed!`);
        return Reflect.set(target, key, target[key]);
    }
};
export const readOnlyHandlers = Object.assign({
    get: readonlyGet
}, readonlyObj);
export const shallowReadOnlyHandler = Object.assign({
    get: shallowReadonlyGet
}, readonlyObj);