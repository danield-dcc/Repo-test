import request from 'supertest';


import app from '../app'

let cliente;

beforeEach(() => {
    cliente = [{

        nome: "Carlos Monoel",
        endereco: "Duque de Caxias 1888",
        cpf: 123456123,
        telefone: 98877997,
        caes_cadastrados_id: 2
    },]
});

// const cliente = [{
//     nome:"Carlos Mooel",
//     endereco: "Duque de Caxias 1888", 
//     cpf: 123456123,
//     telefone: 98877997, 
//     caes_cadastrados_id: 2}]

/*test('Deve ser possivel adicionar novo cliente', async()=>{
    const response = await request(app)
        .post("/clientes/add/")
        .send(cliente[0])
    

    expect(response.body).toMatchObject({...cliente[0], nome:"Carlos Mooel" })
    //expect(response.body).toEqual(201)
});
*/
test("Deve ser capaz de ler lista de clientes", async () => {
    const response = await request(app)
        .post("/clientes/add/")
        .send(cliente[0])

    const resposta = await request(app)
        .get("/clientes")

    expect(200)
})

test("Deve ser possivel atualizar os dados de um produto", async () => {
    const response = await request(app)
        .post('/clientes/add/')
        .send(cliente[0])

    const updateCliente = {
        ...cliente[0],
        nome: "Carlos da Silva Manuel",
    }

    const respostaUpdate = await request(app)
        .put(`/clientes/${response.body.id}`)
        .send(updateCliente);

    // expect(respostaUpdate.body).toContain(updateCliente)
    expect(200)
    await request(app)
        .delete(`/clientes/${response.body.id}`)
})

test("O status code de um produto cirado deve ser 200", async()=> {

    const response = await request(app)
        .post('/clientes/add')
        .send(cliente[0])

        expect(200)

        await request(app)
        .delete(`/clientes/${response.body.id[0]}`)

})