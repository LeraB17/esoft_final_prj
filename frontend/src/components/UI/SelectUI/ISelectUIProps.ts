import { SelectOptionType } from '../MultipleSelectUI/IMultipleSelectUIProps';
import { IDType } from '#interfaces/types';

export interface ISelectUIProps {
    label: string;
    options: SelectOptionType[] | undefined;
    renderOption?: (option: SelectOptionType) => JSX.Element;
    selectedOption: IDType;
    setSelectedOption: React.Dispatch<React.SetStateAction<IDType>>;
    onChange: (value: IDType) => void;
    onBlur: () => void;
    size?: 'small' | 'medium';
}
