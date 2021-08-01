import {
    effect,
    track,
    trigger
} from "./effect";

export function computed(getterOrOptions) {
    let getter;
    let setter;
    if (typeof getterOrOptions === "function") {
        getter = getterOrOptions;
        setter = () => {};
    } else {
        getter = getterOrOptions.get;
        setter = getterOrOptions.set;
    }
    // 缓存控制，如果是true执行，是false就走缓存
    let dirty = true;
    let computed;
    let runner = effect(getter, {
        // 第一次不执行，只有依赖改变才执行getter函数
        lazy: true,
        computed: true,
        // 依赖发生变化
        scheduler: () => {
            if (!dirty) {
                dirty = true;
                trigger(computed, "set", "value");
            }
        }
    });
    let value;
    computed = {
        get value() {
            if (dirty) {
                value = runner();
                dirty = false;
                // 依赖收集
                track(computed, "get", "value");
            }
            return value;
        },
        set value(newValue) {
            setter(newValue);
        }
    };
}