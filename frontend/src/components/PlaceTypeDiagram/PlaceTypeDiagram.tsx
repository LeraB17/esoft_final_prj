import { FC, useMemo } from 'react';
import DoughnutChart from '#components/DoughnutChart/DoughnutChart';
import withLoading from '#components/HOC/withLoading';
import withErrorHandling from '#components/HOC/withErrorHandling';
import { IPlaceTypeDiagramProps } from './IPlaceTypeDiagramProps';
import { getColorByType, getLabelNameByType } from '#utils/mapFunctions';

const PlaceTypeDiagram: FC<IPlaceTypeDiagramProps> = ({ data, size, withLegend = false }) => {
    const chartData = useMemo(() => {
        if (data) {
            const labels = data?.map((elem) => getLabelNameByType(elem.type));
            const data_ = data?.map((elem) => elem.count);
            const colors = data?.map((elem) => getColorByType(elem.type));

            return {
                labels: labels,
                datasets: [
                    {
                        data: data_,
                        backgroundColor: colors,
                        borderWidth: 2,
                        radius: '100%',
                    },
                ],
            };
        }
        return undefined;
    }, [data]);

    return (
        <>
            {chartData ? (
                <DoughnutChart
                    data={chartData}
                    size={size}
                    withLegend={withLegend}
                />
            ) : null}
        </>
    );
};

export default withErrorHandling(withLoading(PlaceTypeDiagram));
