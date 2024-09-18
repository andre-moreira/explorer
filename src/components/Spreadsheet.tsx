import React, { useMemo, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ColDef } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

interface TimeSeriesDataPoint {
  series: string;
  timestamp: string;
  value: number;
}

interface SpreadsheetProps {
  data: TimeSeriesDataPoint[];
}

const Spreadsheet: React.FC<SpreadsheetProps> = ({ data }) => {
  const { columnDefs, rowData } = useMemo(() => {
    const seriesMap = new Map<string, { [key: string]: number }>();
    const timestamps = new Set<string>();

    data.forEach(({ series, timestamp, value }) => {
      if (!seriesMap.has(series)) seriesMap.set(series, {});
      seriesMap.get(series)![timestamp] = value;
      timestamps.add(timestamp);
    });

    const sortedTimestamps = Array.from(timestamps).sort();
    const columnDefs: ColDef[] = [
      { field: 'series', headerName: 'Series', pinned: 'left' },
      ...sortedTimestamps.map(timestamp => ({ field: timestamp, headerName: timestamp }))
    ];

    const rowData = Array.from(seriesMap, ([series, values]) => ({
      series,
      ...values
    }));

    return { columnDefs, rowData };
  }, [data]);

  const defaultColDef = {
    sortable: true,
    filter: true,
    resizable: true,
  };

  const onGridReady = useCallback((params: any) => {
    params.api.sizeColumnsToFit();
  }, []);

  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        onGridReady={onGridReady}
        gridOptions={{}}
      />
    </div>
  );
};

export default Spreadsheet;