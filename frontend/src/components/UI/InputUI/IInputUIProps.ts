export interface IInputUIProps {
    id?: string;
    label?: string;
    // variant="standard"
    type?: string;
    helperText?: string;
    inputError?: boolean;
    value: any;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
