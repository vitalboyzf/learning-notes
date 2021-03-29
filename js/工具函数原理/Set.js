class Set {
    constructor(iterator = []) {
        if (typeof iterator[Symbol.iterator] !== "function") {
            throw new TypeError("传入的不是可迭代对象！");
        }
        this._datas = [];
        for (const data of iterator) {

            this.add(data);
        }
    }
    add(data) {
        // console.log(data+"ji")
        if (!this.has(data)) {
            this._datas.push(data);
        }
    }
    has(data) {
        for (const item of this._datas) {
            if (this.isEqual(data, item)) {
                return true;
            }
        }
        return false;
    }
    delete(data) {
            for (let i = 0; i < this._datas.length; i++) {
                if (this.isEqual(data, this._datas[i])) {
                    this._datas.splice(i, 1);
                    return true;
                }
                return false;
            }
        }
        *[Symbol.iterator]() {
            for (const item of this._datas) {
                yield item;
            }
        }
    forEach(func) {
        for (const item of this._datas) {
            func(item, item, this);
        }
    }

    clear() {
        this._datas.length = 0;
    }
    isEqual(value1, value2) {
        if (value1 === 0 && value2 === 0) {
            return true;
        }
        return Object.is(value1, value2);
    }
    get size() {
        return this._datas.length;
    }
}