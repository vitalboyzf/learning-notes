const KoaRouter = require("koa-router");

const router = new KoaRouter({
    prefix: "/api"
});
router.options("/", (ctx) => {
    console.log(ctx.message);
    if (ctx.message === "OPTION") {
        console.log("预检请求");
    }
});
router.put("/login", (ctx) => {
    // ctx.cookies.set("token", "2021", {
    //     signed: true,
    //     httpOnly: false,
    //     sameSite:"lax",
    //     maxAge: 3600 * 1000
    // });
    // ctx.session.user = {
    //     name: "zf",
    //     password: 456
    // };
    ctx.session.user = {
        name: "zf"
    };
    ctx.session.age = 4564643;
    console.log(ctx.session.inspect());
    // console.log(ctx.session);

    ctx.body = {
        userName: "zf",
        password: "124"
    };
});
router.get("/query/:id", (ctx) => {
    ctx.body = "动态路由" + ctx.params.id;
});
router.get("/queryAll", (ctx) => {
    ctx.body = "查询所有api";
});
module.exports = router;