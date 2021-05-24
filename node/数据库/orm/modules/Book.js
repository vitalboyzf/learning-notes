const sequelize = require("./db");
const { DataTypes } = require("sequelize");
module.exports = sequelize.define("Book", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: false
    },
    publishDate: {
        type: DataTypes.STRING,
        allowNull: false
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    paranoid: true
});