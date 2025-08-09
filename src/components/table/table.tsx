import {
  flexRender,
  HeaderGroup,
  Table as ReactTableInstance,
} from "@tanstack/react-table";
import { VariableSizeList as List, VariableSizeList } from "react-window";
import styles from "./table.module.scss";
import TableRow from "../table-row/table-row";
import { TClient } from "../../types/types";
import { useLayoutEffect, useRef, useState } from "react";
import Panel from "../panel/panel";
import { useClientById } from "../../hooks/hooks";

interface TableProps {
  table: ReactTableInstance<TClient>;
  isDisabled: boolean;
};

function Table({ table, isDisabled = false }: TableProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [clientIdToFetch, setClientIdToFetch] = useState<number | null>(null); // выбранный id клиента
   
  const isExpanded = clientIdToFetch !== null;
  const listRef = useRef<VariableSizeList>(null);
  const rows = table.getRowModel().rows;

  const getItemSize = (index: number) => {

    const isExpanded = expandedIndex === Math.floor(index / 2);
    const isExpansionRow = index % 2 === 1;
    return isExpansionRow ? (isExpanded ? 616 : 0) : 50;
  };

  const toggleRow = (rowIndex: number, id: number) => {
    const isAlreadyExpanded = expandedIndex === rowIndex;
  
    setExpandedIndex(isAlreadyExpanded ? null : rowIndex);
  
    if (!isAlreadyExpanded) {
      setClientIdToFetch(id); // это активирует useQuery
    } else {
      setClientIdToFetch(null); // скрываем и сбрасываем
    }
  };
  
  const { data: clientData } = useClientById(clientIdToFetch, isExpanded);

  useLayoutEffect(() => {
    listRef.current?.resetAfterIndex(0);
  }, [expandedIndex]);

  return (
    <section className={styles.tableWrapper}>
      <div className={styles.header}>
        {table.getHeaderGroups().map((headerGroup: HeaderGroup<TClient>) => (
          <div key={headerGroup.id} className={styles.row}>
            {headerGroup.headers.map((header, i) => (
              <div key={header.id} className={i === 0 ? styles.firstCell : styles.cell}>
                {flexRender(header.column.columnDef.header, header.getContext())}
              </div>
            ))}
          </div>
        ))}
      </div>

      <List
        height={800}
        itemCount={rows.length * 2}
        itemSize={getItemSize}
        ref={listRef}
        width="100%"
      >
        {({ index, style }) => {
          const rowIndex = Math.floor(index / 2);
          const row = rows[rowIndex];

          if (index % 2 === 0) {
            return (
              <div style={style} key={`row-${row.id}`}>
                <TableRow isDisabled={isDisabled} row={row} onClick={() => {
                  if (!isDisabled)
                  toggleRow(rowIndex, row?.original?.id)
                }} />
              </div>
            );
          }

          return (
            <div
              style={style}
              key={`expand-${row.id}`}
              className={styles.expanded}
            >
              {expandedIndex === rowIndex && (
                <div className={styles.box}>
                  <Panel clientData={clientData}/>
                </div>
              )}
            </div>
          );
        }}
      </List>
    </section>
  );
}

export default Table;
