const knex = require("../database/dbConfig")
 
export default class LimpaBd {
    static async limpar(req, res) {
       await knex('clientes').truncate()
    }
}