const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// ✅ ENV IDENTIFIER (canary / stable)
const ENV = process.env.APP_ENV || 'stable';
/**
 * ✅ Use MySQL CONNECTION POOL
 * ✅ Use MySQL SERVICE name (not localhost)
 */
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'mysql-service',
  user: 'root',
  password: 'root123',
  database: 'aadhaar_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

console.log('MySQL pool created');

app.get('/', (req, res) => {
  res.send(`
    <h2>Aadhaar Registration - ${ENV.toUpperCase()}</h2>
    <form method="POST" action="/submit">
      Name: <input name="name" required /><br/><br/>
      Aadhaar: <input name="aadhaar" required /><br/><br/>
      DOB: <input type="date" name="dob" required /><br/><br/>
      <button type="submit">Submit</button>
    </form>
  `);
});

app.post('/submit', (req, res) => {
  const { name, aadhaar, dob } = req.body;

  const query =
    'INSERT INTO user_details (name, aadhaar_number, dob) VALUES (?, ?, ?)';

  pool.query(query, [name, aadhaar, dob], (err) => {
    if (err) {
      console.error('Insert failed:', err);
      return res.status(500).send('Error saving data');
    }
    res.send('Data saved successfully');
  });
});

app.listen(3000, () => {
  console.log('App running on port 3000');
});

