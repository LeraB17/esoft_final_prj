import { FC } from 'react';
import { IInputUIProps } from './IInputUIProps';
import { TextField } from '@mui/material';

const InputUI: FC<IInputUIProps> = ({ id, label, type = 'text', helperText, inputError, value, onChange }) => {
    return (
        <>
            <TextField
                id={id}
                label={label}
                variant="standard"
                type={type}
                helperText={helperText}
                error={Boolean(inputError)}
                value={value}
                onChange={onChange}
            />
        </>
    );
};

export default InputUI;
