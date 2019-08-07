// pacotes para fazer requisicoes em apis externas
const axios = require('axios');
//Model dev para edicoes acoes no banco
const Dev = require('../models/Dev');

module.exports = {
    async store(req, res) {
        console.log(req.body.username);
        //Esta maneira se chama desestrutucacao,
        const{ username} = req.body;
        const userExists = await Dev.findOne({ user: username });

        if(userExists){
            return res.json(userExists);
        }
        const response = await axios.get(`https://api.github.com/users/${username}`);
        const {name, bio, avatar_url: avatar} = response.data;
        const dev = await Dev.create({
            name,
            user: username,
            bio,
            avatar
        })
        return res.json(dev);
    }
}