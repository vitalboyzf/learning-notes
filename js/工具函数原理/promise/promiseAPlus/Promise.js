(function () {
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
            // 如果当前状态为pending,不做任何处理
            if (self.PromiseState !== PENDING) return;
            // 不是pending，改变当前promise实例的状态
            self.PromiseState = state;
            // 改变当前promise实例的值
            self.PromiseResult = result;
            // 异步通知后续then回调函数执行e4
            setTimeout(function () {
                // 执行目标函数数组的所有函数
                var callbackChains = state === FULFILLED ? self.onFulfilledCallbacks : self.onRejectedCallbacks;
                for (var i = 0; i < callbackChains.length; i++) {
                    // 如果是函数，执行函数并将当前promise实例的值作为参数传入
                    if (typeof callbackChains[i] === "function") {
                        callbackChains[i](self.PromiseResult);
                    }
                }
            });
        };
        // 失败态回调
        var reject = function reject(reason) {
            run(REJECTED, reason);
        };
        // 成功态回调
        var resolve = function resolve(value) {
            // 处理resolve(new Promise(...))的情况
            // 当value 已决状态后调用resolve/reject,并将已决结果转递给resolve/reject函数
            if (value instanceof Promise) {
                return value.then(resolve, reject);
            }
            run(FULFILLED, value);
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
        // 阻止循环引用
        if (x === promise2) {
            return reject(new TypeError("Chain cycle deleted for promise #<Promise>"));
        }
        // 如果结果x是对象或者函数
        if ((x !== null && typeof x === "object") || typeof x === "function") {
            // 用于防止第三方promise在已决状态后修改状态
            let called = false;
            try {
                // 获取对象的then属性
                var then = x.then;
                // 如果then是一个函数，x则是一个promise实例，等待已决状态结果
                if (typeof then === "function") {
                    // 返回结果是一个新的promise实例【可能是别人构建的promise】
                    then.call(x, function (y) {
                        // 如果已经调用过，就不再执行后续
                        if (called) return;
                        called = true;
                        // 已决状态
                        resolvePromise(promise2, y, resolve, reject);
                    }, function (r) {
                        // 如果已经调用过，就不再执行后续
                        if (called) return;
                        called = true;
                        // 拒绝状态
                        reject(r);
                    });
                }
                // then不是一个函数，x是一个普通对象，直接resolve x
                else {
                    resolve(x);
                }
            } catch (err) {
                if (called) return;
                called = true;
                reject(err);
            }
        }
        // 结果x是普通类型，直接resolve
        else {
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
                // 如果当前promise实例的状态是已决成功状态
                if (self.PromiseState === FULFILLED) {
                    // 异步执行
                    setTimeout(function () {
                        try {
                            // 获取回调函数的返回值
                            var x = onFulfilled(self.PromiseResult);
                            // 交给resolvePromise处理
                            resolvePromise(promise, x, resolve, reject);
                        } catch (error) {
                            reject(error);
                        }
                    });
                }
                // 如果当前promise实例是已决失败状态
                else if (self.PromiseState === REJECTED) {
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
        },
        finally: function (fn) {
            // 执行回调，穿透到下一个then/catch
            return this.then(data => {
                return Promise.resolve(fn()).then(() => data);
            }, err => {
                return Promise.resolve(fn()).then(() => {
                    throw err;
                });
            });
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
    Promise.all = function (promiseArr) {
        return new Promise(function (resolve, reject) {
            var index = 0,
                ret = [];
            // 循环遍历promise实例数组
            for (var i = 0; i < promiseArr.length; i++) {
                // 创建闭包，保存i
                (function (i) {
                    // 取出每一个promise实例
                    var proItem = promiseArr[i];
                    // 如果元素不是promise对象，直接将对应数组位置赋值为当前值，index记录加一
                    if (!(proItem instanceof Promise)) {
                        index++;
                        ret[i] = proItem;
                        if (index === promiseArr.length) {
                            // 将最终的结果数组resolve
                            resolve(ret);
                        }
                        return;
                    }
                    // 当前proItem是promise实例，调用then方法获取resolve/reject处理结果
                    proItem.then(function (result) {
                        index++;
                        // 将获取的结果赋值给数组对应位置
                        ret[i] = result;
                        // 如果index记录等于promise实例数组长度，说明所有promise实例已经处理完毕
                        if (index === promiseArr.length) {
                            // 将最终的结果数组resolve
                            resolve(ret);
                        }
                    }).catch(function (err) {
                        // 只要有一个失败就整体失败
                        reject(err);
                    });
                }(i));
            }
        });
    };
    Promise.race = function (promiseArr) {
        return new Promise((resolve, reject) => {
            for (var i = 0; i < promiseArr.length; i++) {
                (function (i) {
                    var proItem = promiseArr[i];
                    if (!(proItem instanceof Promise)) {
                        resolve(proItem);
                    } else {
                        // 是promise实例
                        proItem.then(function (result) {
                            resolve(result);
                        }, function (err) {
                            reject(err);
                        });
                    }
                }(i));
            }
        });
    };

    if (typeof globalThis === "object") globalThis.Promise = Promise;
    else if (typeof window === "object" && window.window === window) window.Promise = Promise;
    else if (typeof global === "object") global.Promise = Promise;
}());
Promise.all([3, 4]).then(res => {
    console.log(res);
});