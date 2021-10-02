const { Pool } = require("pg");
// pg.defaults.ssl = true;


const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // ssl: true,
  ssl: { rejectUnauthorized: false },
});
module.exports = {
  query: (text, params) => pool.query(text, params),
};
