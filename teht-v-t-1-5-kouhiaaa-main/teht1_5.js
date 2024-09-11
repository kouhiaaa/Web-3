const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 3004;

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'customer'
});

connection.connect(err => {
  if (err) {
    console.error('Tietokantaan ei saatu yhteyttä: ' + err.stack);
    return;
  }
  console.log('Yhteys tietokantaan luotu.');
});

app.get('/api/customer', (req, res) => {
  const nimi = req.query.nimi || '';
  const osoite = req.query.osoite || '';
  const asty = req.query.asty || '';

  let query = `
    SELECT 
      a.AVAIN AS AVAIN, 
      a.NIMI AS NIMI, 
      a.OSOITE AS OSOITE, 
      a.POSTINRO AS POSTINRO, 
      a.POSTITMP AS POSTITMP, 
      a.LUONTIPVM AS LUONTIPVM, 
      a.ASTY_AVAIN AS ASTY_AVAIN,
      t.SELITE AS ASTY_SELITE
    FROM asiakas a
    LEFT JOIN asiakastyyppi t ON a.ASTY_AVAIN = t.AVAIN
    WHERE 1=1
  `;

  if (nimi) {
    query += ` AND a.NIMI LIKE ?`;
  }
  if (osoite) {
    query += ` AND a.OSOITE LIKE ?`;
  }
  if (asty) {
    query += ` AND a.ASTY_AVAIN = ?`;
  }

  const params = [];
  if (nimi) params.push(`${nimi}%`);
  if (osoite) params.push(`${osoite}%`);
  if (asty) params.push(asty);

  connection.query(query, params, (error, results) => {
    if (error) {
      console.error('Virhe kyselyssä: ' + error.stack);
      res.status(500).json({ status: 'NOT OK', message: 'Virheellinen haku', data: [] });
      return;
    }

    if (results.length === 0) {
      res.json({ status: 'NOT OK', message: 'Virheellinen haku', data: [] });
    } else {
      res.json({ status: 'OK', message: '', data: results });
    }
  });
});

app.use((req, res) => {
  const incorrectPath = req.originalUrl;
  connection.query('SELECT COUNT(*) AS count FROM asiakas', (error, results) => {
    if (error) {
      console.error('Virhe kyselyssä: ' + error.stack);
      res.status(500).json({ message: 'Sisäinen palvelinvirhe', count: 0 });
      return;
    }

    res.status(404).json({
      message: `Osoite oli virheellinen:${incorrectPath}`,
      count: results[0].count
    });
  });
});

//app.listen(port, () => {
 // console.log(`Server running at http://localhost:${port}/`);
//});

module.exports = app;
