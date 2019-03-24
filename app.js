const express = require('express');
const morgan = require('morgan');
const address = require('address');
const uuid = require('uuid');
const config = require('./config');

const app = express();

app.use(morgan('combined'));

app.use((req, res, next) => {
    res.setHeader('X-API-UUID', uuid());
    next();
});

app.get('/time', (req, res) => {
    res.json({
        time: new Date(),
    });
});

app.get('/health_check', (req, res) => {
    res.json({
        status: 'ok',
    });
});

app.get('/address', (req, res) => {
    res.json({
        time: new Date(),
        ip: address.ip()
    });
});

app.listen(config.port, () => {
    console.log(`listen on port ${config.port}`)
});
