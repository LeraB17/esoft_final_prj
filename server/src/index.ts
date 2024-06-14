import http from 'http';
import express from 'express';
import { SERVER } from './config/config.js';
import { routeNotFound } from './middleware/routeNotFound.js';
import DbNoteRepo from './repositories/dbNoteRepo.js';
import NoteService from './services/NoteService.js';
import NoteController from './controllers/NoteController.js';
import { noteRoutes } from './routes/noteRoutes.js';
import db from './db/db.js';
import DbPlaceRepo from './repositories/dbPlaceRepo.js';
import PlaceService from './services/PlaceService.js';
import PlaceController from './controllers/PlaceController.js';
import { placeRoutes } from './routes/placeRoutes.js';

const placeRepo = new DbPlaceRepo();
const noteRepo = new DbNoteRepo();

const placeService = new PlaceService(placeRepo);
const placeController = new PlaceController(placeService);

const noteService = new NoteService(noteRepo, placeRepo);
const noteController = new NoteController(noteService);

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api', noteRoutes(noteController));
app.use('/api', placeRoutes(placeController));

const httpServer = http.createServer(app);
httpServer.listen(SERVER.SERVER_PORT, () => {
    app.use(routeNotFound); // после всех маршрутов
    console.log(`Server started on port ${SERVER.SERVER_PORT}`);
});

// Закрытие подключения к базе данных при завершении работы сервера
process.on('SIGTERM', async () => {
    console.log('Closing database connection...');
    await db.destroy();
    process.exit(0);
});

process.on('SIGINT', async () => {
    console.log('Closing database connection...');
    await db.destroy();
    process.exit(0);
});
