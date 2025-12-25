const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: 'root',
  password: 'root123',
  database: 'aadhaar_db'
});

db.connect(err => {
  if (err) {
    console.error('DB connection failed:', err);
    return;
  }
  console.log('Connected to MySQL');
});

app.get('/', (req, res) => {
  res.send(`
    <h2>Aadhaar Registration</h2>
    <form method="POST" action="/submit">
      Name: <input name="name" required /><br/><br/>
      Aadhaar Number: <input name="aadhaar" required /><br/><br/>
      DOB: <input type="date" name="dob" required /><br/><br/>
      <button type="submit">Submit</button>
    </form>
  `);
});

app.post('/submit', (req, res) => {
  const { name, aadhaar, dob } = req.body;

  const query =
    'INSERT INTO user_details (name, aadhaar_number, dob) VALUES (?, ?, ?)';

  db.query(query, [name, aadhaar, dob], (err) => {
    if (err) {
      console.error(err);
      res.send('Error saving data');
      return;
    }
    res.send('Data saved successfully');
  });
});

app.listen(3000, () => {
  console.log('App running on port 3000');
});
