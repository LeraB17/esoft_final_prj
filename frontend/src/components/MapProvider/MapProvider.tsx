import { useAppSelector } from '#hooks/redux';
import { createContext, useContext, ReactNode, FC } from 'react';
import { useParams } from 'react-router-dom';

interface MapContextType {
    isAllowEdit: boolean | undefined;
    userName: string;
}

const MapContext = createContext<MapContextType | undefined>(undefined);

export const MapProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const { username } = useParams();
    const { user } = useAppSelector((state) => state.auth);

    const isAllowEdit = (!username && user?.nickname !== undefined) || username === user?.nickname;
    const userName = username || user?.nickname || '';

    return <MapContext.Provider value={{ isAllowEdit, userName }}>{children}</MapContext.Provider>;
};

export const useMapContext = (): MapContextType => {
    const context = useContext(MapContext);
    if (!context) {
        throw new Error('useMapContext must be used within a MapProvider');
    }
    return context;
};
