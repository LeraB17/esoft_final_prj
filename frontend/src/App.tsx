import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import '@fontsource/roboto/400.css';
import { routes } from '#routes/routes';
import NotFoundPage from '#pages/NotFoundPage/NotFoundPage';
import MainLayout from '#layouts/MainLayout/MainLayout';
import { useAppDispatch } from '#hooks/redux';
import { useEffect } from 'react';
import { selectIsAuth, setToken } from '#store/reducers/authSlice';
import { getToken } from '#utils/token';
import { useSelector } from 'react-redux';

const App = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const token = getToken();
        if (token) {
            dispatch(setToken(token));
        }
    }, []);

    const isAuth = useSelector(selectIsAuth);
    console.log('isAuth', isAuth);

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<MainLayout />}>
                    {routes.map(({ Component, children, ...route }) => (
                        <Route
                            key={route.path}
                            path={route.path}
                            element={<Component />}
                        >
                            {children &&
                                children?.map(({ path, Component }) =>
                                    path.length === 0 ? (
                                        <Route
                                            key={path}
                                            index
                                            element={<Component />}
                                        />
                                    ) : (
                                        <Route
                                            key={path}
                                            path={path}
                                            element={<Component />}
                                        />
                                    )
                                )}
                        </Route>
                    ))}
                    <Route
                        path="*"
                        element={<NotFoundPage />}
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
