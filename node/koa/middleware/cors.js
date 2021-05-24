const { allowedMethods } = require("../routes/student");

const allowCors = ["http://127.0.0.1:5500"];
module.exports = async (ctx, next) => {
    if (ctx.header["origin"]) {
        if (allowCors.includes(ctx.headers.origin)) {
            // 允许跨域
            ctx.set("Access-Control-Allow-Origin", ctx.headers.origin);
            ctx.set("Access-Control-Allow-Credentials", true);

            if (ctx.method === "OPTIONS") {
                ctx.set("Access-Control-Allow-Headers", ctx.headers["access-control-request-headers"]);
                ctx.set("Access-Control-Allow-Methods", ctx.headers["access-control-request-method"]);
            }
        }
    }
    await next();
};