import { PaginationRenderItemParams } from '@mui/material';

export interface IPaginationUIProps {
    count: number;
    currentPage: number;
    siblingCount?: number;
    boundaryCount?: number;
    onChange?: (event: React.ChangeEvent<unknown>, value: number) => void;
    renderItem?: ((params: PaginationRenderItemParams) => React.ReactNode) | undefined;
}
