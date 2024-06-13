import { FC } from 'react';
import { useMapEvents } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import { ADD_NOTE_PAGE } from '#utils/urls';
import { useAppDispatch } from '#hooks/redux';
import { setLatLng } from '#store/reducers/noteSlice';

const MapClickHandler: FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useMapEvents({
        click: (e) => {
            const { lat, lng } = e.latlng;
            dispatch(setLatLng({ lat, lng }));
            navigate(ADD_NOTE_PAGE);
        },
    });
    return null;
};

export default MapClickHandler;
