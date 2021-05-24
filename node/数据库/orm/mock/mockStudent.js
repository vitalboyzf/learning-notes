var Mock = require("mockjs");
var result = Mock.mock({
    "list|100": [{
        "name": "@cname",
        "birthday": "@date",
        "sex|0-1": 0,
        "phone": /1\d{10}/,
        "ClassId|1-10": 1
    }]
}).list;
const Student = require("../modules/Student");
Student.bulkCreate(result);