const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    console.log('endpoint');
    res.send('hi');
});

module.exports = app;

app.listen(7890, () => {
    console.log('started on 7890');
});
