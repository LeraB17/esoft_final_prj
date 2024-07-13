import { MAIN_PAGE } from '#utils/urls';
import { FC } from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: FC = () => {
    return (
        <div>
            <div>Страница не найдена</div>
            <Link to={MAIN_PAGE}>На главную</Link>
        </div>
    );
};

export default NotFoundPage;
