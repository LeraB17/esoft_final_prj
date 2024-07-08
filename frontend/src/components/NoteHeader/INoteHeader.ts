export interface INoteHeader {
    mode: 'create' | 'viewMy' | 'viewOther' | 'empty';
    color?: 'primary' | 'inherit' | 'default' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
    isShortcut?: boolean;
}
