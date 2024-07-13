import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { routes } from '#routes/routes';
import NotFoundPage from '#pages/NotFoundPage/NotFoundPage';
import MainLayout from '#layouts/MainLayout/MainLayout';

const AppRouter = () => {
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

export default AppRouter;
