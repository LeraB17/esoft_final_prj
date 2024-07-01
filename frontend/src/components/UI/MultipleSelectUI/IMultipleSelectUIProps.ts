import { IDType } from '#interfaces/types';

export interface IMultipleSelectUIProps {
    label: string;
    options: SelectOptionType[] | undefined;
    renderOption?: (option: SelectOptionType) => JSX.Element;
    selectedOptions: SelectOptionType[];
    onChange: (value: SelectOptionType[]) => void;
    onBlur: () => void;
    size?: 'small' | 'medium';
}

export type SelectOptionType = {
    label: string;
    value: IDType;
};
