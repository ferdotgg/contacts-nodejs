const express = require('express');
const router = express.Router();
const path = require('path');
var Serializer = require("damn-simple-xml");
var serializer = new Serializer();
const fs = require('fs');

const mysqlConnection  = require('../database.js');

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname+'/index.html'));
});

// GET all Contacts
router.get('/contacts', (req, res) => {
  mysqlConnection.query('SELECT * FROM contactos', (err, rows, fields) => {
    if(!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });  
});

// GET XML
router.get('/xml', (req, res) => {
  res.sendFile(path.join(__dirname+'/xml.html'));
  mysqlConnection.query('SELECT * FROM contactos', (err, rows, fields) => {
    if(!err) {
      var xml = "";
      serializer.serialize({
        name: "contacts", 
        data: rows
      }, function(err, xmlpart, level) {
        if (err) {
          console.log(err);
          return;
        }
        xml += xmlpart;
        if (level === 0) {  // 0 means seialization is done
          fs.writeFileSync("contacts.txt", xml)
          console.log('¡Se ha creado el XML!')
        }
      });
    } else {
      console.log(err);
    }
  });  
});

// GET An Employee
router.get('/contacts/:id', (req, res) => {
  const { id } = req.params; 
  mysqlConnection.query('SELECT * FROM contactos WHERE IDCON = ?', [id], (err, rows, fields) => {
    if (!err) {
      res.json(rows[0]);
    } else {
      console.log(err);
    }
  });
});

module.exports = router;
