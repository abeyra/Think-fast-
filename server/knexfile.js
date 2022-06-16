// Update with your config settings.

module.exports = {
  development: {
    client: 'mysql',
    connection: {
      host: "127.0.0.1",
      database: "think_fast",
      user: "root",
      password: process.env.Password,
    },
  },

  production: {
    client: 'mysql',
    connection: process.env.JAWSDB_URL,
  },
};
