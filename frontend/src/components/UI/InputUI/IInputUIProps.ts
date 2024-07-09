import { SxProps } from '@mui/material';

export interface IInputUIProps {
    id: string;
    label?: string;
    disabled?: boolean;
    type?: 'text' | 'password' | 'email';
    helperText?: string;
    inputError?: boolean;
    value: any;
    size?: 'small' | 'medium';
    sx?: SxProps;
    multiline?: boolean;
    rows?: number;
    variant?: 'outlined' | 'standard' | 'filled';
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: () => void;
}
