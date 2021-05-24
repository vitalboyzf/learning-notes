import {
    track,
    trigger
} from "./effect.js";
import {
    isObject
} from "./share.js";
import {
    reactive
} from "./reactive.js";
const convert = (val) => isObject(val) ? reactive(val) : val;
class RefImpl {
    constructor(_rawValue, shallow) {
        this._rawValue = _rawValue;
        this.shallow = shallow;
        this._value = shallow ? _rawValue : convert(_rawValue);
        this.__v_isRef = true;
    }
    get value() {
        // 收集依赖
        track(this, "GET", "value");
        return this._value;
    }
    set value(newValue) {
        if (this._value !== newValue) {
            this._rawValue = newValue;
            this._value = this.shallow ? newValue : convert(newValue);
            trigger(this, "SET", "value", newValue);
        }
    }
}

function createRef(rowValue, shallow = false) {
    return new RefImpl(rowValue, shallow);
}
// ref内部使用的是defineProperty
export function ref(value) {
    // value是一个普通类型，将普通类型转换为一个对象
    return createRef(value);
}
export function shallowRef(value) {
    return createRef(value, true);
}
class ObjectRefImpl {
    constructor(obj, key) {
        this.__v_isRef = true;
        this.target = obj;
        this.key = key;
    }
    get value() {
        return this.target[this.key];
    }
    set value(newValue) {
        this.target[this.key] = newValue;
    }
}
// 将一个对象的值转化为ref类型
export function toRef(obj, key) {
    return new ObjectRefImpl(obj, key);
}
export function toRefs(obj) {
    const ret = Array.isArray(obj) ? new Array(obj.length) : {};
    for (const key in obj) {
        ret[key] = toRef(obj, key);
    }
    return ret;
}