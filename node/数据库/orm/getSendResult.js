exports.getErr = function (err = "server error", errorCode = 500) {
    return {
        code: errorCode,
        msg: err
    };
};
exports.getResult = function (result) {
    return {
        code: 200,
        msg: "ok",
        data: result
    };
};
exports.asyncHandler = function (handler) {
    return async (req, res, next) => {
        try {
            const result = await handler(req, res, next);
            if (result) {
                res.send(exports.getResult(result));
            } else {
                res.send(exports.getErr("查询失败"));
            }
        } catch (e) {
            res.send(exports.getErr(e));
            next(e);
        }
    };
};