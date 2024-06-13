import { LatLngType } from './MapTypes';

export interface INote {
    id: number;
    user_id: number;
    name: string;
    text: string;
    coordinates: LatLngType;
    publicity_status_id: number;
    // created_at: Date;
}
