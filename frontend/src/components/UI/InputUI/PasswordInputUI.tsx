import { FC, useState } from 'react';
import { IInputUIProps } from './IInputUIProps';
import { FormControl, IconButton, Input, InputAdornment, InputLabel } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const PasswordInputUI: FC<IInputUIProps> = ({ id, label, helperText, inputError, value, onChange }) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <FormControl
            sx={{ m: 1, width: '25ch' }}
            variant="standard"
            error={inputError}
        >
            <InputLabel htmlFor={id}>{label}</InputLabel>
            <Input
                id={id}
                type={showPassword ? 'text' : 'password'}
                value={value}
                onChange={onChange}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                }
            />
            <span>{helperText}</span>
        </FormControl>
    );
};

export default PasswordInputUI;
