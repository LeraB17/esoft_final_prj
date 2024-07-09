import { IUser } from '#interfaces/IUser';

export interface ISubscriptionsBlockProps {
    subscriptions: IUser[] | undefined;
    subscribers: IUser[] | undefined;
}
