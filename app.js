const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const handlebars = require("express-handlebars")
const Student = require("./models/students")


app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

//bodyparser usado para receber dados do form
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

//Routes
//View com os estudantes inscritos no DB
app.get('/list', function(req, res){
    //Find all students, on descrescent order
    Student.findAll({order: [['id', 'DESC']]}).then(function(users){
        res.render('list', {devsdata: users});
    })    
});

app.get('/add-student', function(req, res){
    res.render('add');
});

app.post('/student', function(req, res){
    Student.create({
        nome: req.body.nome,
        email: req.body.email
    }).then(function(){
        res.redirect('/list')
        //res.send("Aluno Cadastrado")
    }).catch(function(erro){
        res.send("Erro ao cadastrar aluno >" + erro)
    })
    //res.send("Nome: " + req.body.nome + "<br>Email: " + req.body.email)
});

app.get('/del-student/:id', function(req,res){
    Student.destroy({
        where: {'id': req.params.id}
    }).then(function(){
        res.redirect('/list')
    }).catch(function(erro){
        res.send('Cadastro não foi excluído com sucesso')
    })
})

app.listen(8080);