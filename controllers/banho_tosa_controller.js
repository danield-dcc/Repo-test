
const knex = require("../database/dbConfig")


module.exports = {

    async index(req, res) {

        
        try {
            const caes = await knex
                .select("a.id", "a.dia", "a.hora", "a.preco", "c.nome as Cliente", "caes.nome as Nome do Cachorro", "ra.nome as Raça", "caes.foto")
                .from("agendamento_banho_tosa as a")
                .leftJoin("clientes as c", "a.cliente_id", "c.id")
                .innerJoin("caes_cadastrados as caes", "c.caes_cadastrados_id", "caes.id")
                .innerJoin("raca_cachorro as ra", "ra.id", "caes.raca_cachorro_id")
                .orderBy("a.id")
            res.status(200).json(caes);
        } catch (error) {
            res.status(400).json(error.message);
        }



    },

   

    async store(req, res) {

        const { dia, hora, preco, cliente_id, caes_cadastrados_id } = req.body;

        //validação para os campos
        if (!dia || !hora || !preco || !cliente_id || !caes_cadastrados_id) {
            res.status(400).json({ erro: "Enviar dia, hora, preco, cliente id, e cachorro id " });
            return;
        }

        //verificando horario           //horario anterior ou durante o periodo de uma hora
        
        
            // const hora1 = hora[0]
            // const horarios = await knex("agendamento_banho_tosa").where({hora, dia});
            // if({hora:horarios[0]} < hora1 || {hora:horarios[0]} + 1 < hora1  || dia == ){
            //     res.status(400).json({ erro: "Erro. Horário indisponível" });
            //     return
            // }
    

        try {
            const novo = await knex("agendamento_banho_tosa").insert({ dia, hora, preco, cliente_id, caes_cadastrados_id });
            res.status(201).json({ id: novo[0] });
        } catch (error) {
            res.status(400).json({ erro: error.message });
        }
    },

    //alteração por id
    async update(req, res) {
        const id = req.params.id
        const { dia, hora, preco, cliente_id, caes_cadastrados_id } = req.body;

        try {
            await knex('agendamento_banho_tosa').update({ dia, hora, preco, cliente_id, caes_cadastrados_id }).where({ id })
            res.status(200).json({ msg: "ok" })
        } catch (error) {
            res.status(400).json({ msg: error.message })
        }

    },

    //delete destroy
    async destroy(req, res) {
        const id = req.params.id;
        try {
            await knex('agendamento_banho_tosa').del().where({ id })
            res.status(200).json("Agendamento excluido com sucesso!")
        } catch (error) {
            res.status(400).json({ msg: error })
        }
    },

    //show
    async show(req, res) {
        const { palavra } = req.params
        try {
            const usuaios = await knex('usuarios').where('nome', 'like', `%${palavra}%`)

            const agendamentos = await knex('agendamento_banho_tosa').where('dia', 'like', `%${palavra}%`)
                .orWhere('hora', 'like', `%${palavra}%`)
                .orWhere('preco', 'like', `%${palavra}%`)
                .orWhere('cliente_id', 'like', `%${palavra}%`)
                .orWhere('caes_cadastrados_id', 'like', `%${palavra}%`)
            res.status(200).json(agendamentos)
        } catch (error) {
            res.status(400).json({ msg: error.message })
        }
    },





}