const Koa = require("koa");
const app = new Koa();
app.keys = ["zf", "virtual"];
const path = require("path");
const router = require("./routes/student");
const koaStatic = require("./koa-static");
const session = require("koa-session");

const sessionConfig = {
    key: "sessionId", /** (string) cookie key (default is koa.sess) */
    maxAge: 39000,
    autoCommit: true, /** (boolean) automatically commit headers (default true) */
    overwrite: true, /** (boolean) can overwrite or not (default true) */
    httpOnly: false, /** (boolean) httpOnly or not (default true) */
    signed: true, /** (boolean) signed or not (default true) */
    sameSite: null /** (string) session cookie sameSite options (default null, don't set it) */
};
app.use(session(sessionConfig, app));
// app.use(require("./middleware/cors"));s
app.use(require("@koa/cors")({
    origin: "http://127.0.0.1:5500",
    credentials: true
}));
app.use(require("./routes/tokenMiddleware"));
app.use(koaStatic(path.resolve(__dirname, "public")));
app.use(router.routes());
app.use(router.allowedMethods());
app.listen(3000, () => {
    console.log("listen 3000");
});
