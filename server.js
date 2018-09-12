const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/src/map.html'));
});

app.listen(3000, () => console.log('Listening on port 3000!'));