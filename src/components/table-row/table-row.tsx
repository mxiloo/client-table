import { Row } from '@tanstack/react-table';
import { flexRender } from '@tanstack/react-table';
import styles from './table-row.module.scss';
import { TClient } from '../../types/types';

interface TableRowProps {
  row: Row<TClient>;
  onClick?: () => void;
  isDisabled: boolean;
}

const TableRow = ({ row, onClick, isDisabled }: TableRowProps) => {
  const status = row.original.status;
  return (
    <div className={styles.row} onClick={onClick}>
      {row.getVisibleCells().map((cell, i) => (
        <div key={cell.id} className={i === 0 ? styles.firstCell : styles.cell}>
          {i === 0 && (
            <div
              className={status === 'active' ? styles.active : styles.disabled}
            />
          )}
          {i !== 0 && flexRender(cell.column.columnDef.cell, cell.getContext())}
        </div>
      ))}
    </div>
  );
};

export default TableRow;