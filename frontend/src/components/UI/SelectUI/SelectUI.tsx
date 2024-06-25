import { forwardRef } from 'react';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { ISelectUIProps } from './ISelectUIProps';

const SelectUI = forwardRef<HTMLDivElement, ISelectUIProps>(
    ({ label, options, renderOption, selectedOption, setSelectedOption, onChange, onBlur, size }, ref) => {
        const handleChange = (event: SelectChangeEvent<typeof selectedOption>) => {
            const value = Number(event.target.value);

            setSelectedOption(value);
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
                    value={selectedOption}
                    label={label}
                    onChange={handleChange}
                    onBlur={onBlur}
                    size={size}
                >
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
