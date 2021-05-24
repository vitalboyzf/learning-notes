const sequelize = require("./db");
// require("./Class");
// require("./Admin");
require("./Book");
// require("./Student");
// 执行同步模型，生成映射数据表
sequelize.sync({ alter: true }).then((e) => {
    console.log(e.config.username,"模型同步完毕");
});

