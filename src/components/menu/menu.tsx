import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { getClients } from '../../utils/api';
import { TClient } from '../../types/types';
import { ColumnDef, getCoreRowModel, getFilteredRowModel, useReactTable } from '@tanstack/react-table';
import Table from '../table/table';
import styles from './menu.module.scss';

function Menu() {
  const { data: clients = [], isLoading, isError } = useQuery<TClient[]>({
    queryKey: ['clients'],
    queryFn: getClients,
  });

  const columns = useMemo<ColumnDef<TClient>[]>(() => [
    { header: '', accessorKey: 'status' },
    { header: 'Client name', accessorKey: 'name' },
    { header: 'Start date', accessorKey: 'startDate' },
    { header: 'Balance', accessorKey: 'balance' },
    { header: 'Offers', accessorKey: 'offers', 
      cell: ({ row }) => {
        const offers = row?.original?.offers

        if (Array.isArray(offers)) {
          return offers.length;
        }
        return offers;
      },
    },
    { header: 'Manager', accessorKey: 'manager' },
    {
      header: 'Actions',
      accessorKey: 'actions',
      cell: () => (
        <div className={styles.actions}>
          <button className={styles.eye}></button>
          <button className={styles.edit}></button>
          <button className={styles.trash}></button>
        </div>
      ),
    },
  ], []);

  const table = useReactTable({
    data: clients,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel()
  });

  if (isLoading) return <div>Загрузка...</div>;
  if (isError) return <div>Ошибка загрузки данных</div>;

  return <Table isDisabled={false} table={table} />
}

export default Menu;