import express from "express";
import cors from "cors";
import pg from "pg";
import dotenv from "dotenv";

const app = express();
app.use(express.json());
app.use(cors());

dotenv.config();

// setup sql connection -connection string
const db = new pg.Pool({
  connectionString: process.env.DB_CONN,
  ssl: {
    rejectUnauthorized: false,
  }, //Supabase
});

// root endpoint just to test server
app.get("/", (req, res) => {
  res.send("Server running!");
});

// endpoint to test DB connection
app.get("/test-db", async (req, res) => {
  try {
    const result = await db.query("SELECT 1");
    res.json({ success: true, result: result.rows });
  } catch (error) {
    console.error("DB connection error:", error);
    res.status(500).json({ error: "Cannot connect to DB" });
  }
});

// endpoint to get all events
app.get("/events", async (req, res) => {
  try {
    const events = (
      await db.query(`
        SELECT events.id, events.title, events.description, events.date, realms.name AS realm_name
        FROM events
        JOIN realms ON events.realm_id = realms.id
        ORDER BY events.date ASC
      `)
    ).rows;
    res.json(events);
  } catch (error) {
    console.error("DB error:", error);
    res.status(500).json({ error: "Failed to fetch events" });
  }
});

// endpoint to get single event by id
app.get("/events/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const event = (
      await db.query(
        `
        SELECT events.id, events.title, events.description, events.date, realms.name AS realm_name
        FROM events
        JOIN realms ON events.realm_id = realms.id
        WHERE events.id = $1
      `,
        [id]
      )
    ).rows[0];
    res.json(event);
  } catch (error) {
    console.error("DB error:", error);
    res.status(500).json({ error: "Failed to fetch event" });
  }
});

// endpoint to add a new event
app.post("/events", async (req, res) => {
  const { title, description, date } = req.body;
  const realm_id = 1; // default realm

  try {
    const newEvent = (
      await db.query(
        `
        INSERT INTO events (title, description, date, realm_id)
        VALUES ($1, $2, $3, $4)
        RETURNING *
      `,
        [title, description, date, realm_id]
      )
    ).rows[0];
    res.status(201).json(newEvent);
  } catch (error) {
    console.error("DB error:", error);
    res.status(500).json({ error: "Failed to add event" });
  }
});

app.listen(8080, () => {
  console.log("Server running on port 8080");
});
