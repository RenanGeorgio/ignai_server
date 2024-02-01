import { Router } from 'express';
import middlewares from '../middlewares';

import * as serverController from '../controllers/server/serverController';

const routes = Router();

routes
    // Test-server
    .get("/test", serverController.test);


export default routes;