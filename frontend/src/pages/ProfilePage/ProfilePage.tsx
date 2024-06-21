import withAuth from '#components/HOC/withAuth';
import { FC } from 'react';

const ProfilePage: FC = () => {
    return <div>ProfilePage</div>;
};

export default withAuth(ProfilePage);
