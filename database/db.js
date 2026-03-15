import Database from "better-sqlite3";

const db = new Database("users.db");

db.prepare(`
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  username TEXT
)
`).run();

export default db;