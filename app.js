const path = require('path');
const express = require('express');
const address = require('address');
const uuid = require('uuid');
const body_parser = require('body-parser');
const morgan_body = require('morgan-body');

const config = require('./config');

const app = express();

app.use(body_parser.json());
morgan_body(app);

app.use((req, res, next) => {
    const id = uuid();
    req.headers[config.xApiUuid] = id
    res.setHeader(config.xApiUuid, id);
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

app.get('/hello', (req, res) => {
    res.json({
        [config.xApiUuid]: req.headers[config.xApiUuid],
        time: new Date(),
        message: 'hello world!',
        ip: address.ip()
    });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(config.port, () => {
    console.log(`listen on port ${config.port}`)
});
