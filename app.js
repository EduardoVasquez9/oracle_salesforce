const express = require('express');
const { Client } = require('pg');
const bodyParser = require("body-parser");
require("dotenv/config");
const app = express();

var PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configurar conexión, middlewares y rutas
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

client.connect( () =>{
  console.log('Connected');
});

// Clientes
app.get('/clients', (req, res)=>{
  client.query('SELECT * FROM salesforce.contact', (err, data)=>{
    res.json(data.rows);
  });
});

app.get('/clients/:id', (req, res)=>{
  client.query('SELECT * FROM salesforce.contact WHERE id = $1', [req.params.id], (err, data)=>{
    res.json(data.rows[0]);
  });
});

app.post('/clients', (req, res) => {
  // son 49 campos
  client.query('INSERT INTO salesforce.contact VALUES ($1)', [req.body.numeroidentificacion__c], (err, data) => {
    res.json(data);
  });
});

app.delete('/clients/:sfid', function(req, res) {
  client.query('DELETE FROM salesforce.contact WHERE sfid = $1', [req.params.sfid], function(error, data) {
    res.json(data);
  });
});

// Facturas
app.get('/factura', (req, res)=>{
  client.query('SELECT * FROM salesforce.factura__c', (err, data)=>{
    res.json(data.rows);
  });
});

app.post('/factura', (req, res) => {
  // son 18 campos
  client.query('INSERT INTO salesforce.factura__c VALUES ($1)', [req.body.Custom_Form__c], (err, data) => {
    res.json(data);
  });
});

app.delete('/factura/:sfid', function(req, res) {
  client.query('DELETE FROM salesforce.factura__c WHERE sfid = $1', [req.params.sfid], function(error, data) {
    res.json(data);
  });
});

// Products
app.get('/productos', (req, res)=>{
  client.query('SELECT * FROM salesforce.producto__c', (err, data)=>{
    res.json(data.rows);
  });
});


// inicializar
app.listen(PORT, () => {
    console.log("Listening...");
  });