import { useAppSelector } from '#hooks/redux';
import { createContext, useContext, useState, ReactNode, FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';

interface MapContextType {
    isAllowEdit: boolean | undefined;
    userName: string;
}

const MapContext = createContext<MapContextType | undefined>(undefined);

export const MapProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [isAllowEdit, setIsAllowEdit] = useState<boolean>(false);
    const [userName, setUserName] = useState<string>('');

    const { username } = useParams();
    const { user } = useAppSelector((state) => state.auth);

    useEffect(() => {
        setIsAllowEdit((!username && user?.nickname !== undefined) || username === user?.nickname);
        setUserName(username || user?.nickname || '');
    }, [username, user]);

    return <MapContext.Provider value={{ isAllowEdit, userName }}>{children}</MapContext.Provider>;
};

export const useMapContext = (): MapContextType => {
    const context = useContext(MapContext);
    if (!context) {
        throw new Error('useMapContext must be used within a MapProvider');
    }
    return context;
};
