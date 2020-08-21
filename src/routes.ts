import { Router } from 'express';
import PingController from '@controllers/PingController';

const routes = Router();

const pingController = new PingController();

routes.get('/ping', pingController.index);

export default routes;
