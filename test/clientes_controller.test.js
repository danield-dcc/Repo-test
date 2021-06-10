import { jest } from '@jest/globals'
import request from 'supertest';

import util from '../util/util'
import app from '../app'
import clientes_controller from '../controllers/clientes_controller'

clientes_controller.index = jest.fn()
clientes_controller.store = jest.fn()
clientes_controller.update = jest.fn()
clientes_controller.destroy = jest.fn()
clientes_controller.show = jest.fn()

const palavra = ["Maria"]

let clientes;


beforeEach(() => {
    clientes = [{
        nome: "Carlos Manuel",
        endereco: "Duque de Caxias 1888",
        cpf: 123456123,
        telefone: 98877997,
        caes_cadastrados_id: 2
    },
    {
        nome: "Antonio da Silva",
        endereco: "Duque de Caxias 1887",
        cpf: 123456123,
        telefone: 98877997,
        caes_cadastrados_id: 3
    },
    {
        nome: "Maria Vasconcelos",
        endereco: "Duque de Caxias 1889",
        cpf: 123456123,
        telefone: 98877997,
        caes_cadastrados_id: 1
    }];

    util.limpar()
});
//limpar a tabela antes de cada teste


afterAll(() => {
    util.limpar()
})


test("deve retornar a listagem de clientes cadastrados", async () => {

    const response = await request(app)
        .post('/clientes/add/')
        .send(clientes[0])

    const responseGet = await request(app).get("/clientes");


    // expect(responseGet.body).toHaveLength(1)

    expect(responseGet.statusCode).toBe(200)

});


test("Deve ser capaz de incluir novo cliente", async () => {

    const response = await request(app)
        .post('/clientes/add/')
        .send(clientes[2])

    expect(response.statusCode).toBe(201)

    util.limpar()

})

test("Deve retornar erro quando algum campo esta em branco ao cadastrar cliente", async () => {

    const response = await request(app)
        .post('/clientes/add/')
        .send({
            nome: "Carlos Manuel",
            endereco: "Duque de Caxias 1888",
            cpf: 123456123,

            caes_cadastrados_id: 2
        })
    expect(response.statusCode).toBe(400)

});

test("Deve atualizar dados do cliente atraves do id", async () => {
    const response = await request(app)
        .post('cliente/add/')
        .send(clientes[0]);

    const clienteAtualizado = {
        ...clientes[0],
        nome: "Carlos Manuel da Silva"
    }

    const resposneAtualizada = await request(app).put(`/clientes/${response.body.id}`)
        .send(clienteAtualizado)

    //expect(resposneAtualizada.body).toHaveLength(1)
    expect(resposneAtualizada.body).toMatchObject({ "msg": "ok" })
})

test("Deve deletar cliente através de id", async () => {
    const response = await request(app)
        .post('/clientes/add/')
        .send(clientes[2])

    const responseDelete = await request(app).delete(`/clientes/${response.body.id}`)

    expect(responseDelete.statusCode).toBe(200)
})




test("deve retornar com a id do cliente", async () => {
    const response = await request(app)
        .post('/clientes/add/')
        .send(clientes[2])

    expect(response.body.id).toBe(1)
})

describe("quando testando o método show", () => {
    it("Deve retornar o código 404 se nenhum parametro é passado", async () => {

        await request(app)
            .post('/clientes/add/')
            .send(clientes[0])

        const responseBusca = await request(app).get(`/clientes/buscar/`)

        expect(responseBusca.statusCode).toBe(404)
    });
    it("Deve retornar dados de busca", async () => {

        await request(app)
            .post('/clientes/add/')
            .send(clientes[0])

        await request(app)
            .post('/clientes/add/')
            .send(clientes[1])

        const response = await request(app)
            .post('/clientes/add/')
            .send(clientes[2])


        const responseBusca = await request(app).get(`/clientes/buscar/Maria`)
        expect(responseBusca.body.clientes).toHaveLength(1)
    });
});
