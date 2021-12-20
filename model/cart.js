var Sequelize = require("sequelize");
const sequelize = require("../connection");

//define the structure of cart table
let cartTable = sequelize.define('cart', {
    productId: {
        primaryKey: true,
        type: Sequelize.INTEGER,
    },
    uniqueId: Sequelize.INTEGER,
    uniqueEmail: Sequelize.STRING,
    img: {
        type: Sequelize.STRING,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    price: {
        type: Sequelize.STRING,
        allowNull: false
    },
    qty: {
        type: Sequelize.INTEGER,
        default: 1
    },
}, {
    timestamps: false,
    freezeTableName: true
});

// cartTable.sync({force: true}).then( () => {
//     console.log("table created successfully!");
// }).catch((err) => {
//     console.error("error ", err);
// }).finally(() => {
//     sequelize.close();
// });

module.exports = cartTable;