import { Router } from 'express';
import employessRouter from './employees.router.js';


function routerApi(app) {
    const router = Router();
    app.use('/api/v1', router);
    router.use('/employees', employessRouter);
}

export default routerApi;