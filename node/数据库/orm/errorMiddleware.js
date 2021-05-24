const getMsg = require("./getSendResult");
module.exports = (err, req, res, next) => {
    if (err) {
        res.status(500).send(getMsg.getErr());
    } else {
        next();
    }
};
