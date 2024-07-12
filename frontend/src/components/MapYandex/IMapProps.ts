import { PlaceType } from '#interfaces/MapTypes';

interface MapFeature {
    type: PlaceType;
    id: number;
    geometry: {
        type: string;
        coordinates: number[];
    };
    properties: {
        hintContent: string;
        balloonContent: string;
        name: string;
    };
}

export interface IMapProps {
    features: MapFeature[] | undefined;
}
