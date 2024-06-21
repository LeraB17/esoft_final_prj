import { FC } from 'react';
import styles from './FormWrapper.module.scss';
import { Box, Button, Card, Typography } from '@mui/material';
import { IFormWrapperProps } from './IFormWrapperProps';

const FormWrapper: FC<IFormWrapperProps> = ({ title, errorMessage, onSubmit, buttonText, textBelow, children }) => {
    return (
        <Card
            variant="outlined"
            className={styles.FormWrapper}
            sx={{ width: { xs: 350, md: 550 }, padding: '30px 5px' }}
        >
            <Typography
                variant="h6"
                noWrap
                sx={{
                    fontWeight: 700,
                }}
            >
                {title}
            </Typography>
            <Typography className={styles.ErrorMessage}>{errorMessage}</Typography>
            <Box
                component="form"
                onSubmit={onSubmit}
                className={styles.Form}
                sx={{
                    '& > :not(style)': { m: 1, width: '90%' },
                }}
            >
                {children}
                <Button
                    type="submit"
                    variant="contained"
                >
                    {buttonText}
                </Button>
            </Box>
            <Typography sx={{ fontSize: 14 }}>{textBelow}</Typography>
        </Card>
    );
};

export default FormWrapper;
