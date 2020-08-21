import express from 'express';
import routes from './routes';

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
        this.express.use(routes);
    }
}

export default new App().express;
