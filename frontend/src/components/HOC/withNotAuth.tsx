import { selectIsAuth } from '#store/reducers/authSlice';
import { MAP_PAGE } from '#utils/urls';
import { ComponentType, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const withNotAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
    return (props: P) => {
        const navigate = useNavigate();

        const isAuth = useSelector(selectIsAuth);

        useEffect(() => {
            if (isAuth) {
                return navigate(MAP_PAGE);
            }
        });

        return <WrappedComponent {...props} />;
    };
};

export default withNotAuth;
