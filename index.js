const express = require('express');
const app = express()
const { jsonLoader } = require('./helpers/json');
const path = require('path');
const aliases = require('./helpers/alises');

const dataset = jsonLoader(path.resolve('./data/cards.json'));

app.get('/cards', (req, res) => {
    res.json(dataset);
});

app.get('/cards/:name', (req, res) => {
    const number = req.params.name.match(/[0-9]/g);
    const query = req.params.name.replace(/[0-9]/g, '').trim();

    var cards = dataset.filter(e => {
        return e.name.toLowerCase() == query.toLowerCase();
    });

    if (cards.length == 0) {

        cards = dataset.filter(e => {
            return e.name.toLowerCase() == aliases[query.toLowerCase()].toLowerCase();
        });
    }

    var card = number != null ? cards[number - 1] : cards[0];

    if (!card) {
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