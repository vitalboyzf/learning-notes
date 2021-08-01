const reverse = function (x) {
    let str = String(x);
    let op = "";
    if (str.startsWith("-")) {
        op = str.substr(0, 1);
        str = str.substr(1);
    }
    str = parseInt(op + str.split("").reverse().join(""));

    if (str < ((-2) ** 31) || str > (2 ** 31 - 1)) {
        str = 0;
    }
    return str;
};