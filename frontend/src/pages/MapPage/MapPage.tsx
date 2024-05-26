import { FC } from 'react';
import styles from './MapPage.module.scss';
import Map from '#components/Map/Map';
import NotesList from '#components/NotesList/NotesList';

const MapPage: FC = () => {
    return (
        <div className={styles.MapPage}>
            <div className={styles.Map}>
                <Map />
            </div>
            <NotesList />
        </div>
    );
};

export default MapPage;
