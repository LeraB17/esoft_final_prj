import { ILabel } from '#interfaces/ILabel';
import { INote } from '#interfaces/INote';
import { IPublicityStatus } from '#interfaces/IPublicityStatus';

export interface INoteFormProps {
    isEdit: boolean;
    note?: INote;
    labels: ILabel[] | undefined;
    statuses: IPublicityStatus[] | undefined;
}
