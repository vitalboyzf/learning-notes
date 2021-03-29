class Map {
    constructor(iterable = []) {
        if (typeof iterable[Symbol.iterator] !== "function") {
            throw new Error(iterable + "传入不是可迭代对象");
        }
        this._Entries = [];
        for (const item of iterable) {
            if (typeof item[Symbol.iterator] !== "function") {
                throw new Error(item + "不是可迭代对象");
            }
            const iterator = item[Symbol.iterator]();
            const key = iterator.next().value;
            const value = iterator.next().value;
            this.set(key, value);
        }
    }

    set(key, value) {
        if (this.has(key)) {
            this._getObject(key).value = value;
        } else {
            this._Entries.push({
                key,
                value
            });
        }

    }

    get(key) {
        const item = this._getObject(key);
        if (item) {
            return item.value;
        } else {
            return false;
        }
    }

    get size() {
        return this._Entries.length;
    }

    _getObject(key) {
        for (const item of this._Entries) {
            if (this.isEqual(item.key, key)) return item;
        }
    }

    has(key) {
        return this._getObject(key) !== undefined;
    }

    delete(key) {
        for (let i = 0; i < this._Entries.length; i++) {
            if (this.isEqual(this._Entries[i].key, key)) {
                this._Entries.splice(i, 1);
                return true;
            }
        }
        return false;
    }

    clear() {
        this._Entries.length = 0;
    }

    isEqual(value1, value2) {
        if (value1 === 0 && value2 === 0) {
            return true;
        }
        return Object.is(value1, value2);
    }

    *[Symbol.iterator]() {
        for (const el of this._Entries) {
            yield [el.key, el.value];
        }
    }

    forEach(callback) {
        for (const el of this._Entries) {
            callback(el.value, el.key, el);
        }
    }
}