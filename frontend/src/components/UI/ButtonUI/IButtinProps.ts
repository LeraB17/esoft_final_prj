import { ButtonProps } from '@mui/material';

export interface IButtonProps extends ButtonProps {
    sx?: object;
    disabled?: boolean;
    onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}
