const express = require('express');
const app = express()
const { jsonLoader } = require('./helpers/json');
const path = require('path');

const dataset = jsonLoader(path.resolve('./data/cards.json'));

app.get('/cards', (req, res) => {
    res.json(dataset);
});

app.get('/cards/:name', (req, res) => {
    const card = dataset.find(e => {
        return e.name.toLowerCase() == req.params.name.toLowerCase();
    });

    if(!card) {
        res.status(404).json({
            message: 'Não encontrado'
        });
    }

    res.json(card);
});

app.get('/random', (req, res) => {
    const subdataset = dataset.filter(e => e.type != 'Habilidade');

    const randomIndex = Math.floor(Math.random() * subdataset.length);

    res.json(subdataset[randomIndex]);
});

app.listen(1337, () => {
    console.log('API online!');
});