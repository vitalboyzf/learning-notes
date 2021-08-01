import { a, obj } from "./table.js";
console.log(a * 34);
const p = new Proxy(obj, {
    set(target, propertyKey, value) {

        return Reflect.set(target, propertyKey, value);
    },
    get(target, propertyKey) {
        return Promise.resolve(Reflect.get(target, propertyKey));
    }
})
console.log(p.name);
const b: number = 45_64;
console.log(b);
let str = "jierjier";
str = str.replaceAll("ji", "张")
console.log(str);



