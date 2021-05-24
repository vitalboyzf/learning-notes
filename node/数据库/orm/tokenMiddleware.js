const { getErr } = require("./getSendResult");
const { pathToRegexp } = require("path-to-regexp");

const needTokenApi = [
    { method: "POST", path: "/api/student/" },
    { method: "GET", path: "/api/student/:id" },
    { method: "PUT", path: "/api/student/updateStudent" }
];

module.exports = (req, res, next) => {
    const isNeed = needTokenApi.filter(api => {
        const regExp = pathToRegexp(api.path);
        return api.method === req.method && regExp.test(req.path);
    });
    if (isNeed.length === 0) {
        next();
        return;
    }
    let token = req.cookies.token;
    // let token = req.signedCookie.token;//解密
    if (!token) {
        token = req.headers.authorization;
    }
    if (!token) {
        handleNoToken(req, res, next);
        console.log("验证未通过");
        return;
    }
    console.log("验证通过");
    next();
};

function handleNoToken(req, res, next) {
    res.status(403).send(getErr("你木有权限", 403));
}