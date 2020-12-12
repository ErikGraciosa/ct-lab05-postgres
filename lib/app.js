const express = require('express');
const Pinball = require('./models/Pinball.js');
const app = express();

app.use(express.json());

app.get('/pinballs', (req, res, next) => {
    Pinball
        .getAll()
        .then(pinball => res.send(pinball))
        .catch(next);
});

app.post('/pinballs', (req, res, next) => {
    Pinball
        .insert(req.body)
        .then(pinball => res.send(pinball))
        .catch(next);
});

app.get('/pinballs/:id', (req, res, next) => {
    Pinball
        .findById(req.params.id)
        .then(pinball => res.send(pinball))
        .catch(next);
})

app.put('/pinballs/:id', (req, res, next) => {
    Pinball
        .update(req.params.id, req.body)
        .then(pinball => res.send(pinball))
        .catch(next);
});

app.delete('/pinballs/:id', (req, res, next) => {
    Pinball
        .delete(req.params.id)
        .then(pinball => res.send(pinball))
        .catch(next);
})

module.exports = app;
