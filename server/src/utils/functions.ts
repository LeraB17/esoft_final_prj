import path from 'path';
import fs from 'fs';

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
