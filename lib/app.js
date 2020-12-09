const express = require('express');
const Pinball = require('./models/Pinball.js');
const app = express();

app.use(express.json());

app.get('/pinballs', (req, res) => {
    
    console.log('endpoint');
    res.send('hi');
});

app.post('/pinballs', (req, res) => {
    console.log('post route ran');
    Pinball.insert({ 
        title: 'Firepower',
        manufacturer: 'Williams',
        manufactureryear: 1980,
        multiball: true
    })
        .then(pinball => res.send(pinball));
});

module.exports = app;
