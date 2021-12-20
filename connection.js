var dbConfig = require("./db.Config");
var Sequelize = require("sequelize");

// connect to the db
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        idle: dbConfig.pool.idle,
        acquire: dbConfig.pool.acquire
    }
});

// sequelize.sync({force: true}).then(() =>{
//     console.log("database connected successfully!");
// }).catch((err) => {
//     console.error("error", err);
// });

module.exports = sequelize;