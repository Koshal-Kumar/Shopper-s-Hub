import pkg from 'pg';
const { Pool } = pkg;

import dotenv from "dotenv";

dotenv.config();

const pool =new Pool(
  {
    user:  "sa@postgresqlashish",
    password: "Hypeteq@2023",
    host : "postgresqlashish.postgres.database.azure.com",
    port: 5432,
    database: "e-commerce(koshal)"
}
);
export default pool;
