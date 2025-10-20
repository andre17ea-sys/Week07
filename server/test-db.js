import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const db = new pg.Pool({
  connectionString: process.env.DB_CONN,
  ssl: { rejectUnauthorized: false },
});

async function testConnection() {
  try {
    const result = await db.query("SELECT 1");
    console.log("Connection successful:", result.rows);
    process.exit(0);
  } catch (error) {
    console.error("Cannot connect:", error);
    process.exit(1);
  }
}

testConnection();
