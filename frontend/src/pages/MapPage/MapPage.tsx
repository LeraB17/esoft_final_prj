import { FC } from 'react';
import withAuth from '#components/HOC/withAuth';
import { MapProvider } from '#components/MapProvider/MapProvider';
import MapPageInside from './MapPageInside';

const MapPage: FC = () => {
    return (
        <MapProvider>
            <MapPageInside />
        </MapProvider>
    );
};

export default withAuth(MapPage);
