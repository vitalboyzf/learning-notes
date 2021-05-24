import { isIntegerKey } from "./share.js";
let uid = 0;
let activeEffect;// 永远指向正在运行的effect
const effectStack = [];

function createReactiveEffect(fn, options) {
    const effect = function reactiveEffect() {
        // 防止死循环
        if (!effectStack.includes(effect)) {
            // fn运行出错，也要更新activeEffect
            try {
                effectStack.push(effect);
                activeEffect = effect;
                fn();
            } finally {
                effectStack.pop();
                activeEffect = effectStack[effectStack.length - 1];
            }
        }
    };

    effect.uid = uid++;// 制作标识，用于区分effect
    effect._isEffect = true;// 用于标识是否为响应式effect
    effect.row = fn;// 保留effect对应原函数
    effect.options = options;// 在effect保留属性
    return effect;
}

export function effect(fn, options = {}) {
    const effect = createReactiveEffect(fn, options);
    if (!options.lazy) {
        effect();// 默认执行一次
    }
    return effect;
}

const targetMap = new WeakMap();

// WeakMap => key {name:"zf",age:"12"} value (map)=>{name:set=>age=>set}
// 依赖收集函数，将收集结果放入targetMap中
export function track(target, type, key) {
    if (activeEffect === undefined) return;
    let depsMap = targetMap.get(target);
    if (!depsMap) {
        targetMap.set(target, depsMap = new Map());
    }
    let dep = depsMap.get(key);
    if (!dep) {
        depsMap.set(key, dep = new Set());
    }
    if (!dep.has(activeEffect)) {
        dep.add(activeEffect);
    }
}
// 找属性对应的effect,执行
export function trigger(target, type, key, newValue, oldValue) {
    // 查看目标对象有没有被依赖收集
    let depsMap = targetMap.get(target);
    // 如果没有直接返回
    if (!depsMap) return;
    // 保存要执行的依赖函数
    const effects = new Set();
    const add = (effectsToAdd) => {
        if (effectsToAdd) {
            effectsToAdd.forEach(effect => effects.add(effect));
        }
    };
    // 将所有要执行的effect，全部存到一个新的集合，最终一起执行
    // 1.看修改的是否是数组的长度
    if (key === "length" && Array.isArray(target)) {
        depsMap.forEach((dep, key) => {
            // 如果修改的是length或key值（索引）大于新值
            if (key === "length" || key > newValue) {
                add(dep);
            }
        });
    } else {
        // 可能是对象
        if (key !== undefined) { // 修改操作
            add(depsMap.get(key));
        }
        if (type === "ADD") {
            if (Array.isArray(target) && isIntegerKey(key)) {
                add(depsMap.get("length"));
            }
        }
        // 执行所有依赖函数
        effects.forEach((effect => effect()));
    }
}