import { UserWithoutPassword } from '../User/IUser';
import { IDType } from '../types';

export interface ISubscription {
    id: IDType;
    userId: IDType;
    targetUserId: IDType;
}

export type ISubscriptionData = Omit<ISubscription, 'targetUserId'> & {
    targetUser: UserWithoutPassword;
};
