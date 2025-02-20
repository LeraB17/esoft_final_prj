import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 5050;

export const SECRET_KEY = process.env.SECRET_KEY || 'secret-key';
export const SESSION_DURATION = process.env.SESSION_DURATION || '15m';
export const REFRESH_SESSION_DURATION_DAYS = process.env.REFRESH_SESSION_DURATION_DAYS || '7';

export const SERVER = {
    SERVER_HOSTNAME,
    SERVER_PORT,
};
