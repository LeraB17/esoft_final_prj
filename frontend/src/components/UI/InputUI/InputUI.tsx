import { forwardRef } from 'react';
import { IInputUIProps } from './IInputUIProps';
import { TextField } from '@mui/material';

const InputUI = forwardRef<HTMLInputElement, IInputUIProps>(
    (
        { id, label, type = 'text', disabled = false, inputError, size = 'medium', variant = 'standard', ...rest },
        ref
    ) => {
        return (
            <>
                <TextField
                    ref={ref}
                    id={id}
                    label={label}
                    size={size}
                    variant={variant}
                    type={type}
                    error={inputError}
                    disabled={disabled}
                    {...rest}
                />
            </>
        );
    }
);

export default InputUI;
