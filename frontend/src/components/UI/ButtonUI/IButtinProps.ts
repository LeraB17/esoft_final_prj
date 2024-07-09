import { ButtonProps, SxProps } from '@mui/material';

export interface IButtonProps extends ButtonProps {
    sx?: SxProps;
    disabled?: boolean;
    onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}
