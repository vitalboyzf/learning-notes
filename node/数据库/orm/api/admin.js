const express = require("express");
// eslint-disable-next-line new-cap
const router = express.Router();
const adminServer = require("../services/adminService");
const { asyncHandler } = require("../getSendResult");
router.get("/login", asyncHandler(async function (req, res, next) {
    const result = await adminServer.login(req.query.loginId, req.query.loginPwd);
    res.cookie("token", result.id, {
        path: "/",
        domain: "localhost",
        maxAge: 1000000
    });
    res.header("authorization", result);
    return result;
}));
module.exports = router;