import * as dotenv from 'dotenv';
dotenv.config();

import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database("gym_culture.db");

// Initialize Database Tables
db.exec(`
  CREATE TABLE IF NOT EXISTS franchise_inquiries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT,
    phone TEXT,
    city TEXT,
    investment TEXT,
    message TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS chat_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    session_id TEXT,
    role TEXT,
    message TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Submit Franchise Inquiry
  app.post("/api/franchise", (req, res) => {
    const { name, email, phone, city, investment, message } = req.body;
    try {
      const stmt = db.prepare(`
        INSERT INTO franchise_inquiries (name, email, phone, city, investment, message)
        VALUES (?, ?, ?, ?, ?, ?)
      `);
      stmt.run(name, email, phone, city, investment, message);
      res.json({ success: true });
    } catch (error) {
      console.error("DB Error:", error);
      res.status(500).json({ error: "Database error" });
    }
  });

  // Log Chat Message
  app.post("/api/chat/log", (req, res) => {
    const { session_id, role, message } = req.body;
    try {
      const stmt = db.prepare(`
        INSERT INTO chat_logs (session_id, role, message)
        VALUES (?, ?, ?)
      `);
      stmt.run(session_id, role, message);
      res.json({ success: true });
    } catch (error) {
      console.error("DB Error:", error);
      res.status(500).json({ error: "Database error" });
    }
  });

  // Admin Data Endpoint
  app.get("/api/admin/data", (req, res) => {
    try {
      const inquiries = db.prepare("SELECT * FROM franchise_inquiries ORDER BY created_at DESC").all();
      const logs = db.prepare("SELECT * FROM chat_logs ORDER BY created_at DESC LIMIT 500").all();
      res.json({ inquiries, logs });
    } catch (error) {
      res.status(500).json({ error: "Database error" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
