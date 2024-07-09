import { FC } from 'react';
import { ITabPanelProps } from './ITabPanelProps';
import { Box } from '@mui/material';

const TabPanel: FC<ITabPanelProps> = ({ children, value, index, ...other }) => {
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: '10px' }}>{children}</Box>}
        </div>
    );
};

export default TabPanel;
