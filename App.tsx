import * as React from 'react';
import './style.css';
import 'ag-grid-enterprise';
import 'ag-grid-community';

import { AgGridReact, CustomCellRendererProps } from 'ag-grid-react';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';

import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';
import { ColDef, LicenseManager } from 'ag-grid-enterprise';
import { useMemo, useState } from 'react';

LicenseManager.setLicenseKey('bja-test-license');

export default function App() {
  // Row Data: The data to be displayed.
  const [rowData, setRowData] = useState([
    { make: 'Tesla', model: 'Model Y', price: 64950, electric: true },
    { make: 'Tesla', model: 'Model S', price: 64944, electric: true },
    { make: 'Ford', model: 'F-Series', price: 33850, electric: false },
    { make: 'Ford', model: 'Fiesta', price: 33850, electric: false },
    { make: 'Ford', model: 'Edsel', price: 33850, electric: false },
    { make: 'Ford', model: 'Ranger', price: 33850, electric: false },
    { make: 'Toyota', model: 'Corolla', price: 29600, electric: false },
    { make: 'Toyota', model: 'Camry', price: 29600, electric: false },
  ]);

  // Column Definitions: Defines the columns to be displayed.
  const [colDefs, setColDefs] = useState([
    { field: 'make', rowGroup: true },
    { field: 'model' },
    { field: 'price' },
    { field: 'electric' },
    {
      field: 'actions',
      editable: false,
      cellRenderer: ActionRenderer,
    },
  ]);

  const defaultColDef = useMemo<ColDef>(() => {
    return {
      editable: true,
      flex: 1,
      minWidth: 100,
      filter: true,
    };
  }, []);

  return (
    <div>
      <h1> - = (( AG Grid Example )) = - </h1>
      {/* wrapping container with theme & size */}
      <div
        className="ag-theme-quartz" // applying the grid theme
        style={{ height: 800 }} // the grid will fill the size of the parent container
      >
        <AgGridReact
          rowData={rowData}
          columnDefs={colDefs}
          defaultColDef={defaultColDef}
        />
      </div>
    </div>
  );
}

export const ActionRenderer = (props: CustomCellRendererProps) => {
  const cellValue = props.valueFormatted ? props.valueFormatted : props.value;
  //const id = props.data.fieldId;

  const buttonClicked = () => {
    console.log('add clicked');
    // alert(`${cellValue} medals won!`);
    console.log(props.data);
    console.log(props.rowIndex);
  };

  if (!props.data) return;
  return (
    <span>
      <span>{cellValue}</span>&nbsp;
      <button onClick={() => buttonClicked()}>add [{props.rowIndex}]</button>
    </span>
  );
};
