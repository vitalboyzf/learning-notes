const { pathToRegexp } = require("path-to-regexp");
const needToken = [
    { method: "GET", path: "/api/queryAll" },
    { method: "GET", path: "/api/query/:id" }
];
module.exports = async (ctx, next) => {
    const apis = needToken.filter(api => {
        return ctx.request.method === api.method && pathToRegexp(api.path).test(ctx.path);
    });
    // 说明不需要验证
    if (apis.length === 0) {
        await next();
        return;
    }
    if (ctx.session.user) {
        await next();
        return;
    }
    let token = ctx.cookies.get("token", {
        signed: true
    });
    if (!token) {
        // 适配移动端
        token = ctx.headers["authorization"];
    }
    if (!token) {
        // 没有认证
        ctx.status = 403;
        ctx.body = {
            code: 403,
            message: "权限不足！"
        };
        return;
    }
    await next();
};