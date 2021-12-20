var Sequelize = require("sequelize");
const sequelize = require("../connection");

//define the structure of users table
let productTable = sequelize.define('products', {
    productId: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true
    },
    gender: {
        type: Sequelize.STRING,
        allowNull: false
    },
    img1: {
        type: Sequelize.STRING,
        allowNull: false
    },
    img2: {
        type: Sequelize.STRING,
        allowNull: false
    },
    price: {
        type: Sequelize.STRING,
        allowNull: false
    },
    aprice: {
        type: Sequelize.STRING,
        allowNull: false
    },
    dprice: {
        type: Sequelize.STRING,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    categories: {
        type: Sequelize.STRING,
        allowNull: false
    },
    brand: {
        type: Sequelize.STRING,
        allowNull: false
    },
}, {
    timestamps: false,
    freezeTableName: true
});

// productTable.sync({force: true}).then( () => {
//     console.log("table created successfully!");
// }).catch((err) => {
//     console.error("error ", err);
// }).finally(() => {
//     sequelize.close();
// });

module.exports = productTable;