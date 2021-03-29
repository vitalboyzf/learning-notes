var PENDING = "pending",
    FULFILLED = "fulfilled",
    REJECTED = "rejected";

function Promise(executor) {
    if (typeof executor !== "function") throw new TypeError("promise resolve " + executor + " is not a  function");

    // 保存this
    var self = this;
    self.PromiseState = PENDING;
    self.PromiseResult = undefined;
    // 储存onFulfilled/onRejected未执行的回调函数
    self.onFulfilledCallbacks = [];
    self.onRejectedCallbacks = [];
    var run = function (state, result) {
        if (self.PromiseState !== PENDING) return;
        self.PromiseState = state;
        self.PromiseResult = result;
        // 异步通知后续then回调函数执行e4
        setTimeout(function () {
            var callbackChains = state === FULFILLED ? self.onFulfilledCallbacks : self.onRejectedCallbacks;
            for (var i = 0; i < callbackChains.length; i++) {
                if (typeof callbackChains[i] === "function") {
                    callbackChains[i](self.PromiseResult);
                }
            }
        });
    };
    var resolve = function resolve(value) {
        // if (value instanceof Promise) {
        //     return value.then(resolve, reject);
        // }
        run(FULFILLED, value);
    };
    var reject = function reject(reason) {
        run(REJECTED, reason);
    };

    // 立即执行executor，如果函数报错，promise状态也要改成reject状态
    try {
        executor(resolve, reject);
    } catch (error) {
        reject(error);
    }
}

// 统一处理基于then返回新实例的成功和失败
function resolvePromise(promise2, x, resolve, reject) {
    if (x === promise2) {
        return reject(new TypeError("Chain cycle deleted for promise #<Promise>"));
    }
    if ((x !== null && typeof x === "object") || typeof x === "function") {
        // 用于防止第三方promise在已决状态后修改状态
        let called = false;
        try {
            var then = x.then;
            if (typeof then === "function") {
                // 返回结果是一个新的promise实例【可能是别人构建的promise】
                then.call(x, function (y) {
                    if (called) return;
                    called = true;
                    resolvePromise(promise2, y, resolve, reject);
                }, function (r) {
                    if (called) return;
                    called = true;
                    reject(r);
                });
            } else {
                // 普通对象
                resolve(x);
            }
        } catch (err) {
            if (called) return;
            called = true;
            reject(err);
        }
    } else {
        resolve(x);
    }
}

Promise.prototype = {
    // 标记为自定义类
    customize: true,
    constructor: Promise,
    then: function (onFulfilled, onRejected) {
        // 处理onFulfilled/onRejected不传递的情况，顺延穿透效果
        if (typeof onFulfilled !== "function") {
            onFulfilled = function (value) {
                return value;
            };
        }
        if (typeof onRejected !== "function") {
            onRejected = function (reason) {
                throw reason;
            };
        }
        var self = this;
        var promise = new Promise(function (resolve, reject) {
            if (self.PromiseState === FULFILLED) {
                setTimeout(function () {
                    try {
                        var x = onFulfilled(self.PromiseResult);
                        resolvePromise(promise, x, resolve, reject);
                    } catch (error) {
                        reject(error);
                    }
                });
            } else if (self.PromiseState === REJECTED) {
                setTimeout(function () {
                    try {
                        var x = onRejected(self.PromiseResult);
                        resolvePromise(promise, x, resolve, reject);
                    } catch (error) {
                        reject(error);
                    }
                });
            } else {
                // 当前为pending状态
                self.onFulfilledCallbacks.push(function (PromiseResult) {
                    setTimeout(function () {
                        try {
                            var x = onFulfilled(PromiseResult);
                            resolvePromise(promise, x, resolve, reject);
                        } catch (err) {
                            reject(err);
                        }
                    });
                });
                self.onRejectedCallbacks.push(function (PromiseResult) {
                    setTimeout(function () {
                        try {
                            var x = onRejected(PromiseResult);
                            resolvePromise(promise, x, resolve, reject);
                        } catch (err) {
                            reject(err);
                        }
                    });
                });
            }
        });
        return promise;
    },
    catch: function (onRejected) {
        return this.then(null, onRejected);
    }
};
Promise.resolve = function (value) {
    return new Promise(function (resolve) {
        resolve(value);
    });
};
Promise.reject = function (reason) {
    return new Promise(function (_, reject) {
        reject(reason);
    });
};
Promise.deferred = function () {
    const dfd = {};
    dfd.promise = new Promise((resolve, reject) => {
        dfd.resolve = resolve;
        dfd.reject = reject;
    });
    return dfd;
};
module.exports = Promise;