const Sequelize = require("sequelize");

const sequelize = new Sequelize("student", "root", "613613", {
    host: "localhost",
    dialect: "mysql",
    logging: null,
    define: {
        "underscored": true,
        "charset": "utf8mb4"
    }
});
module.exports = sequelize;