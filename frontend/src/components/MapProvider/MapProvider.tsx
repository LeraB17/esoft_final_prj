import { useAppSelector } from '#hooks/redux';
import { MAP_PAGE, MAP_USER_PAGE, NOTE_USER_PAGE } from '#utils/urls';
import { createContext, useContext, ReactNode, FC } from 'react';
import { matchPath, useLocation, useParams } from 'react-router-dom';

interface MapContextType {
    isAllowEdit: boolean | undefined;
    userName: string;
    getFilterLink: () => string;
}

const MapContext = createContext<MapContextType | undefined>(undefined);

export const MapProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const { username } = useParams();
    const location = useLocation();
    const { user } = useAppSelector((state) => state.auth);

    const isAllowEdit = (!username && user?.nickname !== undefined) || username === user?.nickname;
    const userName = username || user?.nickname || '';

    const getFilterLink = () => {
        let pathTo;
        if (matchPath(MAP_USER_PAGE, location.pathname) || matchPath(NOTE_USER_PAGE, location.pathname)) {
            pathTo = username ? MAP_USER_PAGE.replace(':username', username) : MAP_PAGE;
        } else {
            pathTo = MAP_PAGE;
        }
        return pathTo;
    };

    return <MapContext.Provider value={{ isAllowEdit, userName, getFilterLink }}>{children}</MapContext.Provider>;
};

export const useMapContext = (): MapContextType => {
    const context = useContext(MapContext);
    if (!context) {
        throw new Error('useMapContext must be used within a MapProvider');
    }
    return context;
};
