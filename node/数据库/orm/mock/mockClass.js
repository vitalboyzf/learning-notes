var Mock = require("mockjs");
var result = Mock.mock({
    "list|10": [{
        "id|+1": 1,
        "name": "前端 @id 期",
        "openDate": "@date"
    }]
}).list;
const Class = require("../modules/Class");

// Class.bulkCreate(result);