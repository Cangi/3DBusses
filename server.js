const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const configDatabase = require('./config/database.js');
const routes = require('./routes/busStops');
const bodyParser = require('body-parser');
mongoose.connect(configDatabase.database);
let db = mongoose.connection;
let port = 3000;

// Check connection
db.once('open', () =>{
  console.log('Connected to MongoDB');
});

// Check for DB errors
db.on('error', (err) =>{
  console.log(err);
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use('/', routes);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/src/map.html'));
});
app.use(express.static(__dirname + '/assets'));
app.listen(port, () => console.log('Listening on port 3000!'));