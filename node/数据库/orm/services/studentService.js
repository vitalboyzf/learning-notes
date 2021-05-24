const Student = require("../modules/Student");
const { Op } = require("sequelize");
// 根据分页查询学生
exports.queryStudentByPage = async function (page, limit, sex, name) {
    const where = {};
    if (sex !== -1) {
        where.sex = sex;
    }
    if (name) {
        where.name = {
            [Op.like]: `%${name}%`
        };
    }
    let result = await Student.findAndCountAll({
        offset: parseInt((page - 1) * limit),
        limit: parseInt(limit),
        where
    });
    result = JSON.parse(JSON.stringify(result));
    return {
        count: result.count,
        data: result.rows
    };
};
// 根据id查询学生
exports.queryStudentById = async function (id) {
    const result = await Student.findByPk(id);
    if (result) {
        return result.toJSON();
    }
    return null;
};
exports.addStudent = async function (studentInfo) {
    const result = await Student.create(studentInfo);
    if (result) {
        return result.toJSON();
    }
    return null;
};
exports.updateStudent = async function f(studentInfo, id) {
    const result = await Student.update(studentInfo, {
        where: {
            id
        }
    });
    return result;
};
