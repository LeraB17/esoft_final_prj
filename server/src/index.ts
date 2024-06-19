import http from 'http';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
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
import DbUserRepo from './repositories/dbUserRepo.js';
import UserService from './services/UserService.js';
import UserController from './controllers/UserController.js';
import { userRoutes } from './routes/userRoutes.js';
import DbTokenRepo from './repositories/dbTokenRepo.js';

const placeRepo = new DbPlaceRepo();
const noteRepo = new DbNoteRepo();
const userRepo = new DbUserRepo();
const tokenRepo = new DbTokenRepo();

const placeService = new PlaceService(placeRepo);
const placeController = new PlaceController(placeService);

const noteService = new NoteService(noteRepo, placeRepo);
const noteController = new NoteController(noteService);

const userService = new UserService(userRepo, tokenRepo);
const userController = new UserController(userService);

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: 'http://localhost:5173',
        credentials: true,
    })
);

app.use('/api', noteRoutes(noteController));
app.use('/api', placeRoutes(placeController));
app.use('/api', userRoutes(userController));

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
