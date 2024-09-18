import React, { useState, useEffect } from 'react';
import Spreadsheet from './components/Spreadsheet';
import Chart from './components/Chart';
import TimeSeriesConfig from './components/TimeSeriesConfig';
import './styles/index.css';

// Define an interface for our time series data point
interface TimeSeriesDataPoint {
  series: string;
  timestamp: string;
  value: number;
}

function App() {
  const [timeSeriesData, setTimeSeriesData] = useState<TimeSeriesDataPoint[]>([]);
  const [config, setConfig] = useState({
    startDate: new Date('2024-01-01'),
    frequency: 'daily' as 'daily' | 'weekly' | 'monthly'
  });
  const [visibleSeries, setVisibleSeries] = useState<{[key: string]: boolean}>({});

  useEffect(() => {
    // Generate sample data
    const sampleData: TimeSeriesDataPoint[] = [];
    const series = ['Series A', 'Series B', 'Series C'];
    const dataPoints = 10;

    // Initialize visibleSeries
    const initialVisibleSeries: {[key: string]: boolean} = {};
    series.forEach(s => {
      initialVisibleSeries[s] = true;
    });
    setVisibleSeries(initialVisibleSeries);

    for (let i = 0; i < dataPoints; i++) {
      const date = new Date(config.startDate);
      switch (config.frequency) {
        case 'daily':
          date.setDate(date.getDate() + i);
          break;
        case 'weekly':
          date.setDate(date.getDate() + i * 7);
          break;
        case 'monthly':
          date.setMonth(date.getMonth() + i);
          break;
      }
      
      series.forEach(s => {
        sampleData.push({
          series: s,
          timestamp: date.toISOString().split('T')[0],
          value: Math.random() * 100
        });
      });
    }

    setTimeSeriesData(sampleData);
  }, [config]);

  const toggleSeries = (seriesName: string) => {
    setVisibleSeries(prev => ({
      ...prev,
      [seriesName]: !prev[seriesName]
    }));
  };

  return (
    <div className="App">
      <h1>Time Series Explorer</h1>
      <TimeSeriesConfig config={config} setConfig={setConfig} />
      <Spreadsheet data={timeSeriesData} />
      <Chart 
        data={timeSeriesData} 
        visibleSeries={visibleSeries} 
        toggleSeries={toggleSeries} 
      />
    </div>
  );
}

export default App;
