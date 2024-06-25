import sqlite3 from 'sqlite3'

const db = new sqlite3.Database('./diaries.db')

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      password TEXT
    )`)

  db.run(`
    CREATE TABLE IF NOT EXISTS diaries (
      userId TEXT,
      date TEXT,
      article TEXT,
      time TEXT,
      isPublic TEXT,
      PRIMARY KEY (userId, date)
    )`)
})

export default db
