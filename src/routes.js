//importa funcao para criar servidor
const express = require('express');

const DevsController = require('./controllers/DevController');
//criando servidor a partir da funcao importada
const routes = express.Router();

// //recebe requisicao de acordo com path;
// routes.get('/', (req, res) => {
//     return res.json({message: `hello ${req.query.name}`});
// });

routes.post('/devs', DevsController.store);

//exporta variavel
module.exports = routes;