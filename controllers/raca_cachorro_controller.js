const { format } = require("mysql2");
const knex = require("../database/dbConfig")

//trabalhando como class
module.exports = {

    async index(req, res) {
         const caes = await knex("raca_cachorro").orderBy("id", "desc");
        //trazer a descrição do relacioanamento e não moente o seu id
        res.status(200).json(caes);
    },

    async store(req, res) {
        // a desestruturação do objeto req.body
        const { nome } = req.body;

        //validação para os campos
        if (!nome ) {
            res.status(400).json({ erro: "Enviar nome da raça do cachorro" })
        }

        try {
            const novo = await knex("caes_cadastrados").insert({ nome })
            res.status(201).json({ id: novo[0] });
        } catch (error) {
            res.status(400).json({ erro: error.message });
        }
    }
}