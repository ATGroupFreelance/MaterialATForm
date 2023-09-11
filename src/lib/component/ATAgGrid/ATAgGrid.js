import React, { useContext } from 'react';

import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component

import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
//Context
import ATFormContext from '../ATForm/ATFormContext/ATFormContext';
//Utils
import { getTitleByEnums } from '../ATForm/UITypeUtils/UITypeUtils';

const ATAgGrid = React.forwardRef(({ rowData, columnDefs, height, ...restProps }, forwardedRef) => {
    const { rtl, enums, agGridLocalText, getLocalText } = useContext(ATFormContext)

    const newColumnDefs = []

    if (columnDefs) {
        for (let i = 0; i < columnDefs.length; i++) {
            const { enumID, ...restColumnDefs } = columnDefs[i]
            
            newColumnDefs.push({
                headerName: columnDefs[i].headerName === undefined ? getLocalText(columnDefs[i].field) : columnDefs[i].headerName,
                valueFormatter: (params) => {
                    return getTitleByEnums({ id: enumID || params.colDef.field, enums, value: params.value })
                },
                ...restColumnDefs
            })
        }
    }

    return <div className="ag-theme-alpine" style={{ height: height || '80vh', width: '100%' }}>
        <AgGridReact
            ref={forwardedRef}
            rowData={rowData}
            columnDefs={newColumnDefs}
            localeText={agGridLocalText}
            rowHeight={48}
            enableRtl={rtl}
            {...restProps}
        />
    </div>
})

export default ATAgGrid;