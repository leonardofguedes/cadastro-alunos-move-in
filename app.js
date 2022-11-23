const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const handlebars = require("express-handlebars")
const student = require("./models/students")


app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

//bodyparser usado para receber dados do form
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

//Routes
app.get('/list', function(req, res){
    res.render('list');
});

app.get('/add-student', function(req, res){
    res.render('add');
});

app.post('/student', function(req, res){
    student.create({
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

app.listen(8080);