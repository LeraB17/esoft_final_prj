import db from '../db/db';
import { IDType } from '../interfaces/types';
import { ILabelRepo } from '../interfaces/Label/ILabelRepo';
import { ILabel, LabelData, PartialLabelData } from '../interfaces/Label/ILabel';
import { INoteLabel } from '../interfaces/Note/INoteLabel';

class DbLabelRepo implements ILabelRepo {
    constructor(readonly tableName = 'labels') {}

    getAll = async (): Promise<ILabel[]> => {
        try {
            const labels = await db.select('*').from<ILabel>(this.tableName);

            return labels;
        } catch (error) {
            console.error(`Error ${this.tableName} getAll:`, error);
            throw new Error('Database error');
        }
    };

    getAllForUser = async (userId: IDType): Promise<ILabel[]> => {
        try {
            const labels = await db.select('*').from<ILabel>(this.tableName).where('userId', userId).orWhereNull('userId');

            return labels;
        } catch (error) {
            console.error(`Error ${this.tableName} getAllForUser:`, error);
            throw new Error('Database error');
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
            console.error(`Error ${this.tableName} getByNoteId:`, error);
            throw new Error('Database error');
        }
    };

    getById = async (labelId: IDType): Promise<ILabel | undefined> => {
        try {
            const note = await db.select('*').from<ILabel>(this.tableName).where('id', labelId).first();

            return note;
        } catch (error) {
            console.error(`Error ${this.tableName} getById:`, error);
            throw new Error('Database error');
        }
    };

    create = async (userId: IDType, data: LabelData): Promise<ILabel> => {
        try {
            const [newLabel] = await db(this.tableName)
                .insert({
                    name: data.name,
                    userId: userId,
                })
                .returning('*');

            return newLabel;
        } catch (error) {
            console.error(`Error ${this.tableName} create:`, error);
            throw new Error('Database error');
        }
    };

    update = async (userId: IDType, labelId: IDType, data: PartialLabelData): Promise<ILabel | undefined> => {
        try {
            const [updatedLabel] = await db(this.tableName)
                .where('userId', userId)
                .andWhere('id', labelId)
                .update(data)
                .returning('*');

            return updatedLabel;
        } catch (error) {
            console.error(`Error ${this.tableName} update:`, error);
            throw new Error('Database error');
        }
    };

    delete = async (userId: IDType, labelId: IDType): Promise<ILabel | undefined> => {
        try {
            const [deletedLabel] = await db(this.tableName)
                .where('userId', userId)
                .andWhere('id', labelId)
                .delete()
                .returning('*');

            return deletedLabel;
        } catch (error) {
            console.error(`Error ${this.tableName} delete:`, error);
            throw new Error('Database error');
        }
    };

    addManyByNoteId = async (noteId: IDType, labelIds: IDType[]): Promise<INoteLabel[]> => {
        try {
            const noteLabel = labelIds.map((labelId) => ({ labelId: labelId, noteId: noteId }));
            const newNoteLabels = await db('notes_labels').insert(noteLabel).returning('*');

            return newNoteLabels;
        } catch (error) {
            console.error(`Error ${this.tableName} addManyByNoteId:`, error);
            throw new Error('Database error');
        }
    };

    deleteAllByNoteId = async (noteId: IDType): Promise<INoteLabel[]> => {
        try {
            const deletedNoteLabels = await db('notes_labels').where({ noteId: noteId }).delete().returning('*');

            return deletedNoteLabels;
        } catch (error) {
            console.error(`Error ${this.tableName} deleteAllByNoteId:`, error);
            throw new Error('Database error');
        }
    };
}

export default DbLabelRepo;
