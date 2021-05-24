export const isObject = (value) => typeof value === "object" && value !== null;
export const isIntegerKey = (value) => parseInt(value) + "" === value;
export const hasOwn = (target, key) => Object.prototype.hasOwnProperty.call(target, key);
