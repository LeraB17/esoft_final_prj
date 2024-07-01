import { forwardRef } from 'react';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { ISelectUIProps } from './ISelectUIProps';

const SelectUI = forwardRef<HTMLDivElement, ISelectUIProps>(
    ({ label, options, emptyOption, renderOption, selectedOption, onChange, onBlur, size }, ref) => {
        const handleChange = (event: SelectChangeEvent<typeof selectedOption>) => {
            const value = Number(event.target.value);
            onChange(value);
        };

        return (
            <FormControl
                sx={{ minWidth: 120, width: '100%' }}
                ref={ref}
            >
                <InputLabel id="simple-select-label">{label}</InputLabel>
                <Select
                    labelId="simple-select-label"
                    id="demo-simple-select"
                    value={selectedOption ? selectedOption : emptyOption ? emptyOption.value : ''}
                    label={label}
                    onChange={handleChange}
                    onBlur={onBlur}
                    size={size}
                >
                    {emptyOption && <MenuItem value={emptyOption.value}>{emptyOption.label}</MenuItem>}
                    {options?.map((option) => (
                        <MenuItem
                            key={option.value}
                            value={option.value}
                        >
                            {renderOption ? renderOption(option) : option.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        );
    }
);

export default SelectUI;
