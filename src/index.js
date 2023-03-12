import express from 'express';
import routerApi from './routes/index.router.js';

const app = express();
const PORT = 3000;

app.use(express.json());
routerApi(app);
app.listen(PORT);
console.log(`Server running on port ${PORT}`);

app.get('/ping', (req, res) => res.send('pong'));