import { FC } from 'react';
import { Chart, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { IDoughnutChartProps } from './IDoughnutChartProps';

Chart.register(ArcElement, Tooltip, Legend, Title);
// Chart.defaults.plugins.tooltip.backgroundColor = 'rgb(0, 0, 156)';
// Chart.defaults.plugins.legend.position = 'right';
Chart.defaults.plugins.legend.display = false;
// Chart.defaults.plugins.legend.title.display = true;
// Chart.defaults.plugins.legend.title.text = '60 of 100 Done';

const DoughnutChart: FC<IDoughnutChartProps> = ({ data, size, withLegend }) => {
    if (withLegend) {
        Chart.defaults.plugins.legend.display = true;
        Chart.defaults.plugins.legend.position = 'right';
    } else {
        Chart.defaults.plugins.legend.display = false;
    }

    return (
        <Doughnut
            width={`${size}px`}
            height={`${size}px`}
            options={{
                responsive: true,
                maintainAspectRatio: true,
            }}
            data={data}
        />
    );
};

export default DoughnutChart;
