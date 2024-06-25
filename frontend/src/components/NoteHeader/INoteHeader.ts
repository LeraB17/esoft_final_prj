export interface INoteHeader {
    mode: 'create' | 'viewMy' | 'viewOther';
    color?: 'primary' | 'inherit' | 'default' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
}
