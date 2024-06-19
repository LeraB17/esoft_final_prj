import { FC, useEffect } from 'react';
import styles from './MapPage.module.scss';
import Map from '#components/Map/Map';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuth } from '#store/reducers/authSlice';
import { LOGIN_PAGE } from '#utils/urls';

const MapPage: FC = () => {
    const navigate = useNavigate();

    const isAuth = useSelector(selectIsAuth);

    useEffect(() => {
        if (!isAuth) {
            navigate(LOGIN_PAGE);
        }
    }, []);

    return (
        <div className={styles.MapPage}>
            <div className={styles.Map}>
                <Map />
            </div>
            <div className={styles.Panel}>
                <Outlet />
            </div>
        </div>
    );
};

export default MapPage;
