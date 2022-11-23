const Sequelize = require("sequelize")

const sequelize = new Sequelize(
    'curso', 
    'root',
    'password', {
        host:'localhost',
        dialect: 'mysql'
    
})

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}