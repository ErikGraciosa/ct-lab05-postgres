const express = require('express');
const app = express();
// const Pinball = require('../lib/models/Pinball');

app.use(express.json());

app.get('/pinball', (req, res) => {
    
    console.log('endpoint');
    res.send('hi');
});

app.post('/pinball', (req, res) => {
    console.log('post route ran');
    Pinball.insert(req.body)
        .then(pinball => res.send(pinball));
});

module.exports = app;

app.listen(7890, () => {
    console.log('started on 7890');
});
