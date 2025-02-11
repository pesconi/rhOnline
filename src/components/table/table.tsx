import React, { Dispatch, SetStateAction } from "react";

export interface TableColumnsProps {
    field: string;
    headerName: string;
    width?: number;
    headerClassName?: string;
    hide?: boolean;
    flex?: number;
    unsortable?: boolean;
}

interface TableProps {
    columns: TableColumnsProps[];
    rows: any[];
}


const Table = (props: TableProps) => {


}

export default Table