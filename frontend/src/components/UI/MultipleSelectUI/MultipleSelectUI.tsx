import { forwardRef } from 'react';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { IMultipleSelectUIProps } from './IMultipleSelectUIProps';

const MultipleSelectUI = forwardRef<HTMLDivElement, IMultipleSelectUIProps>(
    ({ label, options, renderOption, selectedOptions, onChange, onBlur }, ref) => {
        const handleChange = (event: SelectChangeEvent<typeof selectedOptions>) => {
            const value = event.target.value;
            const lastSelected = value[value.length - 1];
            const selected = options?.find((opt) => opt.value === Number(lastSelected));

            if (selected) {
                if (!selectedOptions?.find((item) => item.value === selected.value)) {
                    onChange([...selectedOptions, selected]);
                } else {
                    onChange(selectedOptions.filter((item) => item.value !== selected.value));
                }
            }
        };

        return (
            <FormControl
                ref={ref}
                sx={{ width: '100%' }}
            >
                <InputLabel id="multiple-chip-label">{label}</InputLabel>
                <Select
                    labelId="multiple-chip-label"
                    id="multiple-chip"
                    multiple
                    value={selectedOptions}
                    onChange={handleChange}
                    onBlur={onBlur}
                    input={
                        <OutlinedInput
                            id="select-multiple-chip"
                            label={label}
                        />
                    }
                    renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((item) => (
                                <Chip
                                    key={item.value}
                                    label={item.label}
                                />
                            ))}
                        </Box>
                    )}
                >
                    {options?.map((option) => (
                        <MenuItem
                            key={option.value}
                            value={option.value}
                            style={{
                                backgroundColor: selectedOptions.find((item) => item.value === option.value)
                                    ? 'rgb(116, 181, 255, 0.5)'
                                    : 'inherit',
                            }}
                        >
                            {renderOption ? renderOption(option) : option.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        );
    }
);

export default MultipleSelectUI;
