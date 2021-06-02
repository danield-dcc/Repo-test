// Update with your config settings.

module.exports = {

  development: {
    client: 'mysql2',
    connection: {
      host: '127.0.0.1',
      user: 'root',
      password: '',
      database: 'petshop'

    },
    migrations: {
      tablName: 'migrations',
      directory: './database/migrations'
    },
    seeds: {
      directory: './database/seeds'
  }
  },




};
