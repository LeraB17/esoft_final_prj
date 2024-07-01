import { INote } from '#interfaces/INote';
import { ChangeEvent } from 'react';

export interface INotesListInsideProps {
    notes: INote[] | undefined;
    totalCount: number | undefined;
    page: number;
    onChangePage: (event: ChangeEvent<unknown>, page: number) => void;
}
