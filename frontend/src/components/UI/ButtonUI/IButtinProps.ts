type Variants = 'text' | 'outlined' | 'contained';
type Colors = 'primary' | 'inherit' | 'secondary' | 'success' | 'error' | 'info' | 'warning';

export interface IButtonProps {
    variant: Variants;
    color: Colors;
    text: string;
    disabled: boolean;
    href: string;
    onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
}
