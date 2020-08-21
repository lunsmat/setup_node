import express from 'express';

class App {
    public express: express.Application;
    public constructor() {
        this.express = express();

        this.middlewares();
        this.routes();
    }

    private middlewares() {
        this.express.use(express.json());
    }

    private routes() {
        this.express
            .get('/ping', (req, res) => res.json({ pong: 'true' }));
    }
}

export default new App().express;
