const Admin = require("../modules/Admin");

exports.addAdmin = async function (adminObj) {
    const ins = await Admin.create(adminObj);
    return ins.toJSON();
};
exports.deleteAdmin = async function (adminId) {
    // 方法一
    // const ins = await Admin.findByPk(adminId);
    // if (ins) {
    //     await ins.destroy(adminId);
    //     return ins.toJSON();
    // }
    // 方法二
    const result = await Admin.destroy({
        where: {
            id: adminId
        }
    });
    return result;
};

exports.updateAdmin = async function (id, adminObj) {
    // 方法一
    // const ins = await Admin.findByPk(id);
    // ins.loginId = adminObj.loginId;
    // ins.save();
    // 方法二
    return Admin.update(adminObj, {
        where: {
            id
        }
    });
};
exports.queryAdmin = async function (id) {
    const result = await Admin.findAll({
        attributes: ["loginId"]
    });
    return JSON.parse(JSON.stringify(result));
};
exports.login = async function (loginId, loginPwd) {
    loginId = loginId.toString();
    loginPwd = loginPwd.toString();
    const result = await Admin.findOne({
        where: {
            loginId,
            loginPwd
        }
    });
    if (result) {
        return result.toJSON();
    } else {
        return null;
    }
};