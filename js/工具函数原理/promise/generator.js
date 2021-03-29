function func(x) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(x + 1);
        }, 1000);
    });
}

function* generator(x) {
    const r1 = yield func(x);
    console.log(r1);
    const r2 = yield func(r1);
    console.log(r2);
    const r3 = yield func(r2);
    console.log(r3);
}
const gen = generator();

function asyncGenerator(generator, ...params) {
    const gen = generator(...params);

    function next(args) {
        const {
            value,
            done
        } = gen.next(args);
        if (done) return;
        value.then(x => next(x));
    }
    next();
}
asyncGenerator(generator, 0);