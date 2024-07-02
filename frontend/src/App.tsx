import './App.css';
import '@fontsource/roboto/400.css';
import { useAppDispatch } from '#hooks/redux';
import { useEffect } from 'react';
import { selectIsAuth, setToken, setUser } from '#store/reducers/authSlice';
import { getToken } from '#utils/token';
import { useSelector } from 'react-redux';
import { authAPI } from '#services/AuthService';
import AppRouter from '#routes/AppRouter';

const App = () => {
    const { data: user } = authAPI.useFetchInfoQuery();

    const dispatch = useAppDispatch();

    useEffect(() => {
        const token = getToken();
        if (token) {
            dispatch(setToken(token));
            dispatch(setUser(user));
        }
    }, [user]);

    const isAuth = useSelector(selectIsAuth);
    console.log('isAuth', isAuth, user);

    return <AppRouter />;
};

export default App;
