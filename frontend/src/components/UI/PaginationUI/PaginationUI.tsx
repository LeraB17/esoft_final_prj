import { FC } from 'react';
import Pagination from '@mui/material/Pagination';
import { IPaginationUIProps } from './IPaginationUIProps';

const PaginationUI: FC<IPaginationUIProps> = ({
    count,
    currentPage,
    siblingCount,
    boundaryCount,
    onChange,
    renderItem,
}) => {
    return (
        <Pagination
            count={count}
            page={currentPage}
            siblingCount={siblingCount}
            boundaryCount={boundaryCount}
            onChange={onChange}
            renderItem={renderItem}
        />
    );
};

export default PaginationUI;
