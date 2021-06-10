const knex = require("../database/dbConfig")

module.exports = {

    async index(req, res) {

        const clientes = await knex.select("c.id", "c.nome", "c.endereco", "c.cpf", "c.telefone", "caes.nome as Nome do Cachorro", "ra.nome as Raça", "caes.foto")
            .from("clientes as c",)
            .leftJoin("caes_cadastrados as caes", "c.caes_cadastrados_id", "caes.id")
            .innerJoin("raca_cachorro as ra", "ra.id", "caes.raca_cachorro_id")
            .orderBy("c.id")
        res.status(200).json(clientes);
    },

    async store(req, res) {

        const { nome, endereco, cpf, telefone, caes_cadastrados_id } = req.body;

        if (!nome || !endereco || !cpf || !telefone || !caes_cadastrados_id) {
            res.status(400).json({ erro: "Enviar nome, endereço, cpf" });
            return;
        }

        try {
            const novo = await knex("clientes").insert({ nome, endereco, cpf, telefone, caes_cadastrados_id });
            res.status(201).json({ id: novo[0] });
        } catch (error) {
            res.status(400).json({ erro: error.message });
        }
    },


    async update(req, res) {
        const id = req.params.id
        const { nome, endereco, cpf, telefone, caes_cadastrados_id } = req.body;

        try {
            await knex('clientes').update({ nome, endereco, cpf, telefone, caes_cadastrados_id }).where({ id })
            res.status(200).json({ msg: "ok" })
        } catch (error) {
            res.status(400).json({ msg: error.message })
        }
    },


    async destroy(req, res) {
        const id = req.params.id;
        try {
            const dados = await knex('clientes').del().where({ id })
            res.status(200).json("Cliente excluido com sucesso!")

        } catch (error) {
            res.status(400).json({ msg: error })
        }
    },

    async show(req, res) {
        const { palavra } = req.params

        try {
            const clientes = await knex('clientes').where('nome', 'like', `%${palavra}%`)
                .orWhere('endereco', 'like', `%${palavra}%`)
                .orWhere('CPF', 'like', `%${palavra}%`)
                .orWhere('telefone', 'like', `%${palavra}%`)
            res.status(200).json({ clientes })
        } catch (error) {
            res.status(404).json({ msg: error.message })
        }
    },

}