import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { routes } from '#routes/routes';
import NotFoundPage from '#pages/NotFoundPage/NotFoundPage';
import MainLayout from '#layouts/MainLayout/MainLayout';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<MainLayout />}>
                    {routes.map(({ Component, ...route }) => (
                        <Route
                            key={route.path}
                            path={route.path}
                            element={<Component />}
                        />
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
