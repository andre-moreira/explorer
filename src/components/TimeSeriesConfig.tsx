import React from 'react';

interface TimeSeriesConfigProps {
  config: {
    startDate: Date;
    frequency: 'daily' | 'weekly' | 'monthly';
  };
  setConfig: React.Dispatch<React.SetStateAction<{
    startDate: Date;
    frequency: 'daily' | 'weekly' | 'monthly';
  }>>;
}

const TimeSeriesConfig: React.FC<TimeSeriesConfigProps> = ({ config, setConfig }) => {
  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfig(prevConfig => ({
      ...prevConfig,
      startDate: new Date(e.target.value)
    }));
  };

  const handleFrequencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setConfig(prevConfig => ({
      ...prevConfig,
      frequency: e.target.value as 'daily' | 'weekly' | 'monthly'
    }));
  };

  return (
    <div className="time-series-config">
      <h2>Time Series Configuration</h2>
      <div>
        <label htmlFor="start-date">Start Date: </label>
        <input
          type="date"
          id="start-date"
          value={config.startDate.toISOString().split('T')[0]}
          onChange={handleStartDateChange}
        />
      </div>
      <div>
        <label htmlFor="frequency">Frequency: </label>
        <select
          id="frequency"
          value={config.frequency}
          onChange={handleFrequencyChange}
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>
    </div>
  );
};

export default TimeSeriesConfig;
