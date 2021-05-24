const express = require("express");
// eslint-disable-next-line new-cap
const router = express.Router();
const stuServer = require("../services/studentService");
const { asyncHandler } = require("../getSendResult");
router.get("/", asyncHandler(async function (req, res) {
    const page = req.query.page || 1;
    const limit = req.query.limit || 5;
    const sex = req.query.sex || -1;
    const name = req.query.name || "";
    return await stuServer.queryStudentByPage(page, limit, sex, name);
}));
router.get("/:id", asyncHandler(async function (req, res) {
    return await stuServer.queryStudentById(req.params.id);
}));
router.post("/", asyncHandler(async function (req, res, next) {
    return await stuServer.addStudent(req.body);
}));
router.put("/updateStudent", asyncHandler(async function (req, res, next) {
    const { name, sex, phone, birthday, id } = req.query;
    const studentInfo = {
        name,
        sex,
        phone,
        birthday,
        id
    };
    return await stuServer.updateStudent(studentInfo, id);
}));
module.exports = router;