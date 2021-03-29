Object.prototype[Symbol.iterator] = function () {
    let self = this;
    let index = 0;
    const keys = [...Object.getOwnPropertyNames(self), ...Object.getOwnPropertySymbols(self)];
    return {
        next() {
            return index < keys.length ? {
                done: false,
                value: self[keys[index++]]
            } : {
                done: true,
                value: undefined
            };
        }
    };
};
const obj = {
    name: "zf",
    age: 3,
    like: ["web"]
};
for (const iterator of obj) {
    console.log(iterator);
}