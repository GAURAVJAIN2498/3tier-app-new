import express from "express";
import cors from "cors";
import pkg from "pg";

const { Pool } = pkg;
const app = express();
const port = 5000;

// Allow everything during dev (tighten later in prod)
app.use(cors());
app.use(express.json());

const pool = new Pool({
  host: process.env.PGHOST || "db",
  user: process.env.PGUSER || "postgres",
  password: process.env.PGPASSWORD || "postgres",
  database: process.env.PGDATABASE || "mydb",
  port: 5432,
});

app.get("/", (_req, res) => {
  res.send("Hello from Backend API 🚀");
});

app.get("/users", async (_req, res) => {
  try {
    const result = await pool.query("SELECT id, name FROM users ORDER BY id");
    res.json(result.rows);
  } catch (err) {
    console.error("DB error:", err);
    res.status(500).send("DB error");
  }
});

app.listen(port, () => {
  console.log(`✅ Backend running at http://localhost:${port}`);
});

