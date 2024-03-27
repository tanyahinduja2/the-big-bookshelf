const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
app.use(cors());
const port = process.env.PORT || 3000; 

// Create a MySQL pool
const pool = mysql.createPool({
  host: 'the-big-bookshelf.c18woogge0bb.ap-south-1.rds.amazonaws.com',
  port: '3306',
  user: 'admin',
  password: 'thebigbookshelf',
  database: 'thebigbookshelf',
  waitForConnections: true,
  connectionLimit: 100,
  queueLimit: 0
});

app.get('/api/textbooks', async (req, res) => {
    try {
      const connection = await pool.getConnection();
      const [rows, fields] = await connection.query('SELECT * FROM textbooks');
      connection.release();
      res.json(rows);
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


app.listen(port, () => {
    console.log(`Server is running on ${port}`);
  });

// const express = require('express');
// const bodyParser = require('body-parser');
// const app = express();

// app.use(bodyParser.json());

// app.get('/api/hello', (req, res) => {
//     res.json({ message: 'Hello, World!' });
//   });

// const port = process.env.PORT || 5500;
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });