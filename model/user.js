var Sequelize = require("sequelize");
const sequelize = require("../connection");

//define the structure of users table
let userTable = sequelize.define('users', {
    userId: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true
    },
    userSalutation: {
        type: Sequelize.STRING,
        allowNull: false
    },
    userName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    userDob: {
        type: Sequelize.STRING,
        allowNull: false
    },
    userEmail: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    userPassword: {
        type: Sequelize.STRING,
        allowNull: false
    },
}, {
    timestamps: false,
    freezeTableName: true
});

// userTable.sync({force: true}).then( () => {
//     console.log("table created successfully!");
// }).catch((err) => {
//     console.error("error ", err);
// }).finally(() => {
//     sequelize.close();
// });

module.exports = userTable;