
import dotenv from "dotenv";
import mysql from "mysql2";
dotenv.config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
if (connection) {
  console.log("Connected to database");
}
else {
  console.log("Failed to connect to database");
}
export default connection;
