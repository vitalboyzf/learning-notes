function pipe(...func) {
    return function (value) {
        for (let i = 0; i < func.length; i++) {
            value = func[i](value);
        }
        return value;
    };
}