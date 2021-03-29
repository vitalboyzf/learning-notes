import isPlainObject from "./isPlainObject";

export default function merge(obj1, obj2) {
    let isPlainObj1 = isPlainObject(obj1);
    let isPlainObj2 = isPlainObject(obj2);
    if (!isPlainObj1) return obj2;
    if (!isPlainObj2) return obj1;
    // 都是简单对象
    for (const key in obj2) {
        if (Object.hasOwnProperty.call(obj2, key)) {
            obj1[key] = merge(obj1[key], obj2[key]);
        }
    }
    return obj1;
}