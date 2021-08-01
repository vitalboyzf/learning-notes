function isPlainObject(obj) {
    let proto = obj;
    while (Reflect.getPrototypeOf(proto)) {
        proto = Reflect.getPrototypeOf(proto);
    }
    return Reflect.getPrototypeOf(obj) === proto;
}
console.log(isPlainObject([]));