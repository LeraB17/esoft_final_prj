export type colorType = `rgb(${number}, ${number}, ${number})` | string;
export type radiusType = string;
export type datasetType = {
    data: number[];
    backgroundColor: colorType[];
    borderWidth: number;
    radius: radiusType;
};

export type ChartDataType = {
    labels: string[];
    datasets: datasetType[];
};

export interface IDoughnutChartProps {
    data: ChartDataType;
    size: number;
    withLegend: boolean;
}
