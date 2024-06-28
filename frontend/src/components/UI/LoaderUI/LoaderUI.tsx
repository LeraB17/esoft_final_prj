import { FC } from 'react';
import { Backdrop } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

const LoaderUI: FC = () => {
    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={true}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    );
};

export default LoaderUI;
