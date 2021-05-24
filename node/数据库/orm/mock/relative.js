const Class = require("../modules/Class");
const Student = require("../modules/Student");
Class.hasMany(Student);
Student.belongsTo(Class);