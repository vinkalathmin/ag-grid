import React, { useState, useRef } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from '@ag-grid-community/react';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';

import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";

import { ColDef, GridApi, GridOptions, GridReadyEvent, ModuleRegistry } from '@ag-grid-community/core';
// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule]);

const baseDefaultColDef: ColDef = {
    width: 80,
    sortable: true,
    filter: true,
    resizable: true
};

const baseGridOptions: GridOptions = {
    getRowId: function (params) { return params.data.id; },
    rowClassRules: {
        'red-row': 'data.color == "Red"',
        'green-row': 'data.color == "Green"',
        'blue-row': 'data.color == "Blue"'
    },
    rowDragManaged: true,
    animateRows: true
}

const baseColumnDefs: ColDef[] = [
    { field: 'id', dndSource: true },
    { field: 'color' },
    { field: 'value1' },
    { field: 'value2' }
];

const leftGridOptions: GridOptions = {
    ...baseGridOptions,
    columnDefs: [...baseColumnDefs],
    defaultColDef: {
        ...baseDefaultColDef
    }
};

const rightGridOptions: GridOptions = {
    ...baseGridOptions,
    columnDefs: [...baseColumnDefs],
    defaultColDef: {
        ...baseDefaultColDef
    }
};

let nextRowId = 100;

const GridExample = () => {
    const leftGridRef = useRef<AgGridReact>(null);
    const rightGridRef = useRef<AgGridReact>(null);

    const onLeftGridReady = (params: GridReadyEvent) => {
        params.api.setRowData(createLeftRowData());
    }

    const onRightGridReady = (params: GridReadyEvent) => {
        params.api.setRowData([]);
    }

    const createLeftRowData = () => ['Red', 'Green', 'Blue'].map(createDataItem);

    const createDataItem = (color: string) => {
        let newDataItem = {
            id: nextRowId++,
            color: color,
            value1: Math.floor(Math.random() * 100),
            value2: Math.floor(Math.random() * 100)
        };

        return newDataItem;
    }

    const binDragOver = (event: any) => {
        const dragSupported = event.dataTransfer.types.indexOf('application/json') >= 0;
        if (dragSupported) {
            event.dataTransfer.dropEffect = "move";
            event.preventDefault();
        }
    };

    const binDrop = (event: any) => {
        event.preventDefault();
        const jsonData = event.dataTransfer.getData("application/json");
        const data = JSON.parse(jsonData);

        // if data missing or data has no id, do nothing
        if (!data || data.id == null) {
            return;
        }

        const transaction = {
            remove: [data]
        };

        const rowIsInLeftGrid = !!leftGridRef.current!.api.getRowNode(data.id);
        if (rowIsInLeftGrid) {
            leftGridRef.current!.api.applyTransaction(transaction);
        }

        const rowIsInRightGrid = !!rightGridRef.current!.api.getRowNode(data.id);
        if (rowIsInRightGrid) {
            rightGridRef.current!.api.applyTransaction(transaction);
        }
    };

    const dragStart = (color: string, event: any) => {
        const newItem = createDataItem(color);
        const jsonData = JSON.stringify(newItem);

        event.dataTransfer.setData('application/json', jsonData);
    };

    const gridDragOver = (event: any) => {
        const dragSupported = event.dataTransfer.types.length;

        if (dragSupported) {
            event.dataTransfer.dropEffect = 'copy';
            event.preventDefault();
        }
    };

    const gridDrop = (grid: string, event: any) => {
        event.preventDefault();

        const jsonData = event.dataTransfer.getData('application/json');
        const data = JSON.parse(jsonData);

        // if data missing or data has no it, do nothing
        if (!data || data.id == null) {
            return;
        }

        const gridApi: GridApi = grid === 'left' ? leftGridRef.current!.api : rightGridRef.current!.api;

        // do nothing if row is already in the grid, otherwise we would have duplicates
        const rowAlreadyInGrid = !!gridApi.getRowNode(data.id);
        if (rowAlreadyInGrid) {
            console.log('not adding row to avoid duplicates in the grid');
            return;
        }

        const transaction = {
            add: [data]
        };
        gridApi.applyTransaction(transaction);
    };

    return (
        <div className="outer">
            <div style={{ height: "100%" }} className="inner-col ag-theme-alpine" onDragOver={gridDragOver}
                onDrop={(e) => gridDrop('left', e)}>
                <AgGridReact ref={leftGridRef} gridOptions={leftGridOptions} onGridReady={onLeftGridReady} />
            </div>

            <div className="inner-col factory-panel">
                <span id="eBin" onDragOver={binDragOver} onDrop={binDrop}
                    className="factory factory-bin">
                    <i className="far fa-trash-alt"><span className="filename"> Trash - </span></i>
                    Drop target to destroy row
                </span>
                <span draggable="true" onDragStart={(e) => dragStart('Red', e)} className="factory factory-red">
                    <i className="far fa-plus-square"><span className="filename"> Create - </span></i>
                    Drag source for new red item
                </span>
                <span draggable="true" onDragStart={(e) => dragStart('Green', e)}
                    className="factory factory-green">
                    <i className="far fa-plus-square"><span className="filename"> Create - </span></i>
                    Drag source for new green item
                </span>
                <span draggable="true" onDragStart={(e) => dragStart('Blue', e)} className="factory factory-blue">
                    <i className="far fa-plus-square"><span className="filename"> Create - </span></i>
                    Drag source for new blue item
                </span>
            </div>

            <div style={{ height: "100%" }} className="inner-col ag-theme-alpine" onDragOver={gridDragOver}
                onDrop={(e) => gridDrop('right', e)}>
                <AgGridReact ref={rightGridRef} gridOptions={rightGridOptions} onGridReady={onRightGridReady} />
            </div>
        </div>
    );
}

render(
    <GridExample></GridExample>,
    document.querySelector('#root')
)