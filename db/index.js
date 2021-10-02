const { Pool } = require("pg");

const connectionString = process.env.DATABASE_URL

const pool = new Pool({
  connectionString,
});
module.exports = {
  query: (text, params) => pool.query(text, params),
};
