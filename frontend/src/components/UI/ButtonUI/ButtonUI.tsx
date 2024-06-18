import { FC } from 'react';
import Button from '@mui/material/Button';
import { IButtonProps } from './IButtinProps';

const ButtonUI: FC<IButtonProps> = ({ variant, color, text, onClick }) => {
    return (
        <Button
            variant={variant}
            color={color}
            onClick={onClick}
        >
            {text}
        </Button>
    );
};

export default ButtonUI;
