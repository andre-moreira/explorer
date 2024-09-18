import React, { useState, useCallback } from 'react';
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
  const [columnDefs] = useState<ColDef[]>([
    { field: 'series', headerName: 'Series', pinned: 'left' },
    { field: 'timestamp', headerName: 'Timestamp' },
    { field: 'value', headerName: 'Value' },
  ]);

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
        rowData={data}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        onGridReady={onGridReady}
        gridOptions={{}}
      />
    </div>
  );
};

export default Spreadsheet;