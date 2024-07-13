import { IPlaceStats } from '#interfaces/IPlace';

export interface IPlaceTypeDiagramProps {
    data: IPlaceStats[] | undefined;
    size: number;
    withLegend?: boolean;
}
