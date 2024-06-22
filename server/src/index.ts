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
import DbLabelRepo from './repositories/dbLabelRepo.js';
import LabelService from './services/LabelService.js';
import LabelController from './controllers/LabelController.js';
import { labelRoutes } from './routes/labelRoutes.js';
import DbPublicityStatusRepo from './repositories/dbPublicityStatusRepo.js';
import PublicityStatusService from './services/PublicityStatusService.js';
import PublicityStatusController from './controllers/PublicityStatusController.js';
import { publicityStatusRoutes } from './routes/publicityStatusRoutes.js';

const placeRepo = new DbPlaceRepo();
const noteRepo = new DbNoteRepo();
const userRepo = new DbUserRepo();
const tokenRepo = new DbTokenRepo();
const labelRepo = new DbLabelRepo();
const publicityStatusRepo = new DbPublicityStatusRepo();

const placeService = new PlaceService(placeRepo);
const placeController = new PlaceController(placeService);

const labelService = new LabelService(labelRepo);
const labelController = new LabelController(labelService);

const publicityStatusService = new PublicityStatusService(publicityStatusRepo);
const publicityStatusController = new PublicityStatusController(publicityStatusService);

const noteService = new NoteService(noteRepo, placeService, labelService);
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
app.use('/api', labelRoutes(labelController));
app.use('/api', publicityStatusRoutes(publicityStatusController));

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
