import sqlite3 from 'sqlite3'

const db = new sqlite3.Database('./diaries.db')

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS diaries (
      date TEXT PRIMARY KEY,
      article TEXT,
      time TEXT
    )`)
})

export default db
