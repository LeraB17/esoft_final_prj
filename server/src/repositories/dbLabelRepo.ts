import db from '../db/db';
import { IDType } from '../interfaces/types';
import { ILabelRepo } from '../interfaces/ILabelRepo';
import { ILabel, LabelData, PartialLabelData } from '../interfaces/ILabel';
import { INoteLabel } from '../interfaces/INoteLabel';

class DbLabelRepo implements ILabelRepo {
    constructor() {}

    getAll = async (): Promise<ILabel[]> => {
        try {
            const labels = await db.select('*').from<ILabel>('labels');

            return labels;
        } catch (error) {
            console.error('Error labels getAll:', error);
            throw error;
        }
    };

    getAllForUser = async (userId: IDType): Promise<ILabel[]> => {
        try {
            console.log('userId', userId);
            const labels = await db.select('*').from<ILabel>('labels').where('userId', userId).orWhereNull('userId');

            return labels;
        } catch (error) {
            console.error('Error labels getAllForUser:', error);
            throw error;
        }
    };

    getByNoteId = async (noteId: IDType): Promise<ILabel[]> => {
        try {
            const labels = await db('notes_labels')
                .select('labels.id', 'labels.name as labelName')
                .join('labels', 'notes_labels.labelId', 'labels.id')
                .where('notes_labels.noteId', noteId);

            return labels;
        } catch (error) {
            console.error('Error notes getLabels:', error);
            throw error;
        }
    };

    getById = async (labelId: IDType): Promise<ILabel | undefined> => {
        try {
            const note = await db.select('*').from<ILabel>('labels').where('id', labelId).first();

            return note;
        } catch (error) {
            console.error('Error labels getById:', error);
            throw error;
        }
    };

    create = async (userId: IDType, data: LabelData): Promise<ILabel> => {
        try {
            const [newLabel] = await db('labels')
                .insert({
                    name: data.name,
                    userId: userId,
                })
                .returning('*');

            return newLabel;
        } catch (error) {
            console.error('Error labels create:', error);
            throw error;
        }
    };

    update = async (userId: IDType, labelId: IDType, data: PartialLabelData): Promise<ILabel | undefined> => {
        try {
            const [updatedLabel] = await db('labels').where('userId', userId).andWhere('id', labelId).update(data).returning('*');

            return updatedLabel;
        } catch (error) {
            console.error('Error labels update:', error);
            throw new Error('Database error');
        }
    };

    delete = async (userId: IDType, labelId: IDType): Promise<ILabel | undefined> => {
        try {
            const [deletedLabel] = await db('labels').where('userId', userId).andWhere('id', labelId).delete().returning('*');

            return deletedLabel;
        } catch (error) {
            console.error('Error labels delete:', error);
            throw new Error('Database error');
        }
    };

    addByNoteId = async (noteId: IDType, labelId: IDType): Promise<INoteLabel> => {
        try {
            const [newNoteLabel] = await db('notes_labels')
                .insert({
                    noteId: noteId,
                    labelId: labelId,
                })
                .returning('*');

            return newNoteLabel;
        } catch (error) {
            console.error('Error notes addLabel:', error);
            throw error;
        }
    };

    deleteByNoteId = async (noteId: IDType, labelIds: IDType[]): Promise<INoteLabel[]> => {
        try {
            const deletedNoteLabels = await db('notes_labels')
                .where({ noteId: noteId })
                .andWhere(function () {
                    this.whereNotIn('labelId', labelIds);
                })
                .delete()
                .returning('*');

            return deletedNoteLabels;
        } catch (error) {
            console.error('Error notes deleteLabel:', error);
            throw new Error('Database error');
        }
    };
}

export default DbLabelRepo;
