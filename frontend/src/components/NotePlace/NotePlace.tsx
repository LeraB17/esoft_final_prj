import { FC } from 'react';
import { Typography } from '@mui/material';
import PlaceRoundedIcon from '@mui/icons-material/PlaceRounded';
import { INotePlaceProps } from './INotePlaceProps';

const NotePlace: FC<INotePlaceProps> = ({ place, className }) => {
    return (
        <div
            className={className}
            style={{ display: 'flex' }}
        >
            <PlaceRoundedIcon />
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
    );
};

export default NotePlace;
