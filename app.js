const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MySQL connection
const mysql = require('mysql');

const pool = mysql.createPool({
  host: 'sql3.freesqldatabase.com',
  user: 'sql3721397', // Your FreeSQLDatabase username
  password: 'tXF5imL42A', // Your FreeSQLDatabase password
  database: 'sql3721397', // Your FreeSQLDatabase name
  connectionLimit: 100 // Adjust this based on your application's needs
});

// Connect to MySQL database using the pool
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Database connection error:', err);
    process.exit(1);
  } else {
    console.log('Connected to MySQL database');
    connection.release(); // Release the connection back to the pool
  }
});


// Routes
app.post('/submit', (req, res) => {
  const { name, city, country, grade, bestBook, bestMusic, pets, siblings, bestMusician, favoriteColor, birthDate } = req.body;

  const query = 'INSERT INTO submissions (name, city, country, grade, bestBook, bestMusic, pets, siblings, bestMusician, favoriteColor, birthDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  const values = [name, city, country, grade, bestBook, bestMusic, pets, siblings, bestMusician, favoriteColor, birthDate];

  db.query(query, values, (err, results) => {
    if (err) {
      console.error('Error saving form data:', err);
      res.status(500).send('Error saving form data');
    } else {
      res.status(201).send({ id: results.insertId });
    }
  });
});

app.get('/data/:id', (req, res) => {
  const { id } = req.params;

  const query = 'SELECT * FROM submissions WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error retrieving form data:', err);
      res.status(500).send('Error retrieving form data');
    } else if (results.length === 0) {
      res.status(404).send('Data not found');
    } else {
      res.json(results[0]);
    }
  });
});

app.get('/allteam', (req, res) => {
  const query = 'SELECT * FROM submissions';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error retrieving all team data:', err);
      res.status(500).send('Error retrieving all team data');
    } else {
      res.json(results);
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
