import http from 'http';
import express from 'express';
import dotenv from 'dotenv';
import { SERVER } from './config/config.js';
import { routeNotFound } from './middleware/routeNotFound.js';

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const httpServer = http.createServer(app);
httpServer.listen(SERVER.SERVER_PORT, () => {
    app.use(routeNotFound); // после всех маршрутов
    console.log(`Server started on port ${SERVER.SERVER_PORT}`);
});
