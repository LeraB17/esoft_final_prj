import { FC } from 'react';
import Button from '@mui/material/Button';
import { IButtonProps } from './IButtinProps';

const ButtonUI: FC<IButtonProps> = ({ variant = 'text', color = 'primary', type = 'button', children, ...rest }) => {
    return (
        <Button
            variant={variant}
            type={type}
            color={color}
            {...rest}
        >
            {children}
        </Button>
    );
};

export default ButtonUI;
