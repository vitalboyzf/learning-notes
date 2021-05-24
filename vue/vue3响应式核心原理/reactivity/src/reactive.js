import {isObject} from "./share.js";

import {mutableHandlers, readOnlyHandlers, shallowReactiveHandlers, shallowReadOnlyHandler} from "./baseHandlers.js";

export function reactive(target) {
    return createReactiveObject(target, false, mutableHandlers);
}

export function shallowReactive(target) {
    return createReactiveObject(target, false, shallowReactiveHandlers);
}

export function readonly(target) {
    return createReactiveObject(target, true, readOnlyHandlers);
}

export function shallowReadOnly(target) {
    return createReactiveObject(target, true, shallowReadOnlyHandler);
}

const reactiveMap = new WeakMap();
const readonlyMap = new WeakMap();

export function createReactiveObject(target, isReadOnly, baseHandlers) {
    if (!isObject(target)) return target;
    const proxyMap = isReadOnly ? readonlyMap : reactiveMap;
    // 如果某个对象已经被代理过了，就不用再代理了
    const existProxy = proxyMap.get(target);
    if (existProxy) return existProxy;// 如果已经被代理过了，直接返回
    const proxy = new Proxy(target, baseHandlers);
    // 缓存
    proxyMap.set(target, proxy);
    return proxy;
}