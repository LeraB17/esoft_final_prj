import { IUser } from '#interfaces/IUser';
import { SxProps } from '@mui/material';

export interface ISubscriptionsItemProps {
    user: IUser;
    withButton?: boolean;
    sx?: SxProps;
}
