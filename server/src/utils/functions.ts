import path from 'path';
import fs from 'fs';
import { GetNotesArgs } from '../interfaces/GetNotesArgs';

export const deleteFromFolder = async (imageNames: string[]) => {
    imageNames.forEach((image) => {
        const imagePath = path.join(__dirname, '..', '..', 'static', image);
        fs.unlink(imagePath, (err) => {
            if (err) {
                console.error('Error deleting image:', err);
            }
        });
    });
};

export const getLimitAndOffset = (args: GetNotesArgs) => {
    const { limit, offset, ...data } = args;
    return { ...args, limit: Math.min(50, limit || 5), offset: offset || 0 };
};
