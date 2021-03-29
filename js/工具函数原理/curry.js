function curry(func, ...args) {
    const arity = func.length;
    if (args.length >= arity) {
        func.apply(this, args);
    } else {
        return (...args1) => {
            const total = [...args, ...args1];
            curry(func, ...total);
        };
    }
}