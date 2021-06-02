const express = require("express");
const routes = express.Router()



const caes_cadastrados_controller = require('./controllers/caes_cadastrados_controller')
const usuarios_controller = require('./controllers/usuarios_controller')
const login = require("./middleware/login")
const clientes_controller = require("./controllers/clientes_controller");
const raca_cachorro_controller = require("./controllers/raca_cachorro_controller");
const banho_tosa = require("./controllers/banho_tosa_controller")



routes.get("/caes", caes_cadastrados_controller.index)
    .post("/caes/cadastro/", caes_cadastrados_controller.store)
    .get("/caes/destaque", caes_cadastrados_controller.index2)
    .put("/caes/:id", caes_cadastrados_controller.update)       /*alterar destacar*/
    .get("/caes/filtrar/:palavra", caes_cadastrados_controller.show)
    .get("/caes/dados", caes_cadastrados_controller.indexDados)   //dados estatisticos


routes.get("/usuarios", usuarios_controller.index)
    .post("/usuarios", usuarios_controller.store)
    .post("/login", usuarios_controller.login)

routes.get("/clientes", clientes_controller.index)
    .post("/clientes/add/", /*login,*/ clientes_controller.store)
    .put("/clientes/:id", clientes_controller.update)
    .delete("/clientes/:id", clientes_controller.destroy)
    .get("/clientes/buscar/:palavra", clientes_controller.show)

routes.get("/raca", raca_cachorro_controller.index)
    .post("/raca", login, raca_cachorro_controller.index)

routes.get("/banho_tosa", banho_tosa.index)
    .post("/banho_tosa/add/", banho_tosa.store)
    .put("/banho_tosa/:id", banho_tosa.update)
    .delete("/banho_tosa/:id", banho_tosa.destroy)
    .get("/banho_tosa/buscar/:palavra", banho_tosa.show)



module.exports = routes