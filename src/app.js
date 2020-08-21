const express = require('express');

class App {
    constructor() {
        this.express = express();

        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.express.use(express.json());
    }

    routes() {
        this.express.get('/ping', (req, res) => res.json({ pong: 'true' }));
    }
}

module.exports = new App().express;
