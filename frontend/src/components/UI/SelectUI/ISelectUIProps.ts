import { SelectOptionType } from '../MultipleSelectUI/IMultipleSelectUIProps';
import { IDType } from '#interfaces/types';

export interface ISelectUIProps {
    label: string;
    options: SelectOptionType[] | undefined;
    emptyOption?: SelectOptionType;
    renderOption?: (option: SelectOptionType) => JSX.Element;
    selectedOption: IDType | undefined;
    onChange: (value: any) => void;
    onBlur: () => void;
    size?: 'small' | 'medium';
}
