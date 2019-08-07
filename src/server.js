//importa funcao para criar servidor
const express = require('express');
//importa ODM ferramenta para facilitar o trabalho com banco usando javascript 
const mongoose = require('mongoose');
//Importa routes do arquivo routes.js
const routes = require('./routes');
//criando servidor a partir da funcao importada
const server = express();

//connecta com string do mongo! cluster/connect/connect your application
mongoose.connect('mongodb+srv://mongodb:mongodb@cluster0-bafbu.mongodb.net/mongodb?retryWrites=true&w=majority',{
    useNewUrlParser: true
});

//faz a aplicacao comecar a enxergar e tratar json
server.use(express.json());
//faz usar as rotas do arquivo routes improtado
server.use(routes);
//cria porta para servidor
server.listen(3333);

