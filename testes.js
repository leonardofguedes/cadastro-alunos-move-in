var express = require("express");
const app = express();

//Conexão
const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user:'root',
    password: 'password',
    database: 'curso'
});

//Confirmação de conexão
connection.connect(function (err) {
    if (err) {
        console.error('error connecting' + err.stack);
        return;
    }
    console.log('connected as id' + connection.threadId);
});

//Mostrando dados do DB
connection.query('SELECT * FROM users', function(err, rows, fields) {
    if(!err) {
        console.log('Resultado: ', rows);
    }else{
        console.log('Erro');
    }
});

//Conexão para adicionar
connection.connect(function(err) {
    if (err) console.error('Erro na conexão:' + err.stack);
    return;
});

connection.query("INSERT INTO users(nome, email) VALUES ('Paulo', 'paulo@gmail.com')", function(err, result){
    if(!err){
        console.log('Usário cadastrado');
    }else{
        console.log('Erro ao cadastrar');
    }
});

//Conexão para editar
connection.query("UPDATE users SET nome = 'Novo Nome' WHERE id = 2",
function(err, result){
    if(!err){
        console.log('Usuario editado com sucesso');
    }else{
        console.log('Erro ao editar');
    }
});

//Conexão para apagar
connection.query("DELETE FROM users WHERE id = 2",
function(err, result){
    if(!err){
        console.log('Usuario apagado com sucesso');
    }else{
        console.log('Erro ao apagar');
    }
});

// APP
//Route '/'
app.get("/", function(req, res) {
    res.sendFile(__dirname + "/src/index.html");
});

//Route 'contato'
app.get("/contato", function(req, res) {
    res.send("Mais infos")
});

//Route 'sobre'
app.get("/sobre", function(req, res) {
    res.sendFile(__dirname + "/src/sobre.html");
});

app.listen(8080);
