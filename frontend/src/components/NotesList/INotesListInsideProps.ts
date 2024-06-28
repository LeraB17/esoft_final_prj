import { INote } from '#interfaces/INote';

export interface INotesListInsideProps {
    notes: INote[] | undefined;
    totalCount: number | undefined;
    page: number;
}
