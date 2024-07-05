import pkg from 'pg';
const { Pool } = pkg;

import dotenv from "dotenv";

dotenv.config();

console.log('DB User:', process.env.USER);
console.log('DB Host:', process.env.POSTGRE_HOST);
console.log('DB Password:', process.env.PASSWORD);
console.log('DB Port:', process.env.DBPORT);
console.log('DB Name:', process.env.DATABASE);


const pool =new Pool(
  {
    // user:  "sa@postgresqlashish",
    // password: "Hypeteq@2023",
    // host : "postgresqlashish.postgres.database.azure.com",
    // port: 5432,
    // database: "e-commerce(koshal)" 


    user : `${process.env.USER}`,
    password : `${process.env.PASSWORD}`,
    host : `${process.env.POSTGRE_HOST}`,
    port : `${process.env.DBPORT}`,
    database : `${process.env.DATABASE}`,
}
);

// const pool = new Pool({
//   connectionString: process.env.POSTGRES_URL,
// })

export default pool;