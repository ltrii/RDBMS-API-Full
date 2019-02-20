module.exports = {
    development: {
      client: 'sqlite3',
      connection: {
        filename: './database/lambda.db3',
      },
      useNullAsDefault: true,
    },
  };