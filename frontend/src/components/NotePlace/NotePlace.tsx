import { FC } from 'react';
import { Typography } from '@mui/material';
import PlaceRoundedIcon from '@mui/icons-material/PlaceRounded';
import { INotePlaceProps } from './INotePlaceProps';
import { IPlace } from '#interfaces/IPlace';
import { useNavigate } from 'react-router-dom';
import { getSearchString } from '#utils/functions';
import { useMapContext } from '#components/MapProvider/MapProvider';

const NotePlace: FC<INotePlaceProps> = ({ place, className }) => {
    const navigate = useNavigate();

    const { getFilterLink } = useMapContext();

    const handlePlaceClick = (place: IPlace) => {
        const pathTo = getFilterLink();
        navigate(`${pathTo}${getSearchString({ place: place?.id })}`);
    };

    return (
        <div
            className={className}
            style={{ display: 'flex' }}
        >
            <PlaceRoundedIcon />
            <div
                style={{ cursor: 'pointer' }}
                onClick={() => handlePlaceClick(place)}
            >
                <Typography
                    noWrap
                    variant="subtitle1"
                    sx={{
                        fontWeight: 500,
                        paddingRight: 2,
                        fontStyle: 'italic',
                    }}
                >
                    {place?.name}
                </Typography>
            </div>
        </div>
    );
};

export default NotePlace;
