import http from 'http';
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
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
import DbImageRepo from './repositories/dbImageRepo.js';
import ImageService from './services/ImageService.js';
import { artificialDelay } from './middleware/artificialDelay.js';
import AuthService from './services/AuthService.js';
import AuthController from './controllers/AuthController.js';
import { authRoutes } from './routes/authRoutes.js';
import dbSubscriptionRepo from './repositories/dbSubscriptionRepo.js';
import SubscriptionService from './services/SubscriptionService.js';
import SubscriptionController from './controllers/SubscriptionController.js';
import { subscriptionRoutes } from './routes/subscriptionRoutes.js';
import dbShortcutRepo from './repositories/dbShortcutRepo.js';
import ShortcutService from './services/ShortcutService.js';
import ShortcutController from './controllers/ShortcutController.js';
import { shortcutRoutes } from './routes/shortcutRoutes.js';

const placeRepo = new DbPlaceRepo();
const noteRepo = new DbNoteRepo();
const userRepo = new DbUserRepo();
const tokenRepo = new DbTokenRepo();
const labelRepo = new DbLabelRepo();
const publicityStatusRepo = new DbPublicityStatusRepo();
const imageRepo = new DbImageRepo();
const subscriptionRepo = new dbSubscriptionRepo();
const shortcutRepo = new dbShortcutRepo();

const imageService = new ImageService(imageRepo);

const subscriptionService = new SubscriptionService(subscriptionRepo);
const userService = new UserService(userRepo, subscriptionService);
const subscriptionController = new SubscriptionController(subscriptionService, userService);
const userController = new UserController(userService);

const placeService = new PlaceService(placeRepo, userService);
const placeController = new PlaceController(placeService, userService);

const labelService = new LabelService(labelRepo);
const labelController = new LabelController(labelService);

const publicityStatusService = new PublicityStatusService(publicityStatusRepo);
const publicityStatusController = new PublicityStatusController(publicityStatusService);

const shortcutService = new ShortcutService(shortcutRepo, userService);
const noteService = new NoteService(noteRepo, placeService, labelService, imageService, userService, shortcutService);

shortcutService.setNoteService(noteService);

const shortcutController = new ShortcutController(shortcutService);
const noteController = new NoteController(noteService, userService);

const authService = new AuthService(userService, tokenRepo);
const authController = new AuthController(authService);

const app = express();

const uploadDir = path.join(__dirname, '..', 'static');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const filename = `${uuidv4()}-${file.originalname}`;
        cb(null, filename);
    },
});

export const upload = multer({ storage });

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(
    cors({
        origin: 'http://localhost:5173',
        credentials: true,
    })
);

app.disable('x-powered-by');

// app.use(artificialDelay(1000)); // искусственная задержка ответов

app.use('/api', noteRoutes(noteController));
app.use('/api', shortcutRoutes(shortcutController));
app.use('/api', placeRoutes(placeController));
app.use('/api', userRoutes(userController));
app.use('/api', authRoutes(authController));
app.use('/api', subscriptionRoutes(subscriptionController));
app.use('/api', labelRoutes(labelController));
app.use('/api', publicityStatusRoutes(publicityStatusController));

app.use('/static', express.static(uploadDir));

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
