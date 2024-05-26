import { FC } from 'react';
import styles from './MainLayout.module.scss';
import Header from '#components/Header/Header';
import ScrollToTop from '#components/ScrollToTop/ScrollToTop';
import { Outlet } from 'react-router-dom';

const MainLayout: FC = () => {
    return (
        <>
            <Header />
            <ScrollToTop />
            <div className={styles.Content}>
                <div className={styles.Outlet}>
                    <Outlet />
                </div>
            </div>
        </>
    );
};

export default MainLayout;
