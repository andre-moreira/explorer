import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface TimeSeriesDataPoint {
  series: string;
  timestamp: string;
  value: number;
}

interface ChartProps {
  data: TimeSeriesDataPoint[];
  visibleSeries: { [key: string]: boolean };
  toggleSeries: (seriesName: string) => void;
}

const Chart: React.FC<ChartProps> = ({ data, visibleSeries, toggleSeries }) => {
  const [chartData, setChartData] = useState<any>({ datasets: [] });
  const [chartOptions, setChartOptions] = useState<any>({});

  useEffect(() => {
    const uniqueSeries = Array.from(new Set(data.map(item => item.series)));
    const uniqueTimestamps = Array.from(new Set(data.map(item => item.timestamp)));

    const datasets = uniqueSeries.map(series => ({
      label: series,
      data: uniqueTimestamps.map(timestamp => {
        const dataPoint = data.find(item => item.series === series && item.timestamp === timestamp);
        return dataPoint ? dataPoint.value : null;
      }),
      borderColor: `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`,
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
      hidden: !visibleSeries[series],
    }));

    setChartData({
      labels: uniqueTimestamps,
      datasets: datasets,
    });

    setChartOptions({
      responsive: true,
      plugins: {
        legend: {
          position: 'top' as const,
          onClick: (e: any, legendItem: any) => {
            toggleSeries(legendItem.text);
          },
        },
        title: {
          display: true,
          text: 'Time Series Chart',
        },
      },
    });
  }, [data, visibleSeries, toggleSeries]);

  return (
    <div style={{ height: '400px', width: '100%' }}>
      <Line options={chartOptions} data={chartData} />
    </div>
  );
};

export default Chart;