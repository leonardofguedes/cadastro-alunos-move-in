const db = require('./db')

const Student = db.sequelize.define('users', {
    nome: {
        type: db.Sequelize.STRING
    },
    email: {
        type: db.Sequelize.STRING
    }
})

//Apenas para criar a tabela e depois comentarei
//Student.sync({force: true})

module.exports = Student