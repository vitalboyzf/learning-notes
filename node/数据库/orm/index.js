// require('./modules/sync')
// require('./mock/relative')
// require('./mock/mockClass')
// require('./mock/mockStudent')
const express = require("express");
const cookieParse = require("cookie-parser");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const path = require("path");
app.use(cookieParse());
app.use(require("./tokenMiddleware"));
app.use("/api/student", require("./api/student"));
app.use("/api/admin", require("./api/admin"));
app.listen(8080, () => {
    console.log("start...");
});

// const staticPath = path.resolve(__dirname, './public');

// app.use(express.static(staticPath, {
//     index: "index.html",
// }));
// app.use(express.urlencoded({extends: true}));