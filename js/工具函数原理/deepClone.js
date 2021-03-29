function deepCopy(obj) {
    if (typeof obj === "object" && obj !== null) {
        if (Object.prototype.toString.call(obj) === "[object Date]") {
            return new Date(obj);
        }
        if (Object.prototype.toString.call(obj) === "[object RegExp]") {
            return new RegExp(obj);
        }
        const retObj = Array.isArray(obj) ? [] : {};
        for (const key in obj) {
            if (Object.hasOwnProperty.call(obj, key)) {
                retObj[key] = deepCopy(obj[key]);
            }
        }
        return retObj;
    } else {
        return obj;
    }
}