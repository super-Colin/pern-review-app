const { Pool } = require("pg");
pg.defaults.ssl = true;

const connectionString = process.env.DATABASE_URL

const pool = new Pool({
  connectionString,
  // ssl: true
});
module.exports = {
  query: (text, params) => pool.query(text, params),
};
