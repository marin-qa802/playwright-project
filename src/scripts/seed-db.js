// scripts/seed-db.js (пример для PostgreSQL)
const { Client } = require('pg');

async function seed() {
  const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'test',
    password: 'test',
    database: 'testdb',
  });

  await client.connect();
  await client.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100),
      email VARCHAR(100)
    );
  `);
  await client.query(`
    INSERT INTO users (name, email) VALUES 
    ('Test User', 'test@example.com');
  `);
  console.log('База данных наполнена тестовыми данными');
  await client.end();
}

seed().catch(console.error);