import { FC } from 'react';
import { Typography } from '@mui/material';
import PlaceRoundedIcon from '@mui/icons-material/PlaceRounded';
import { INotePlaceProps } from './INotePlaceProps';
import { IPlace } from '#interfaces/IPlace';
import { matchPath, useLocation, useNavigate, useParams } from 'react-router-dom';
import { MAP_PAGE, MAP_USER_PAGE, NOTE_USER_PAGE } from '#utils/urls';
import { getSearchString } from '#utils/functions';

const NotePlace: FC<INotePlaceProps> = ({ place, className }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const { username } = useParams();

    const handlePlaceClick = (place: IPlace) => {
        let pathTo;
        if (matchPath(MAP_USER_PAGE, location.pathname) || matchPath(NOTE_USER_PAGE, location.pathname)) {
            pathTo = username ? MAP_USER_PAGE.replace(':username', username) : MAP_PAGE;
        } else {
            pathTo = MAP_PAGE;
        }
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
