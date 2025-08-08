import { memo, useCallback, useMemo, useState } from "react";
import Info from "../info/info";
import Switcher from "../switcher/switcher";
import styles from "./panel.module.scss";
import stylesActions from "../menu/menu.module.scss";
import DataPanel from "../data-panel/data-panel";
import { ColumnDef, getCoreRowModel, getFilteredRowModel, useReactTable } from "@tanstack/react-table";
import { TOffers } from "../../types/types";

function Panel({ clientData }: any) {
  const clientOffers = clientData?.offers ?? [];
  const clientTerms = clientData?.payment_terms ?? [];

  const [active, setActive] = useState<"offers" | "terms">("offers");

  const [columnFilters, setColumnFilters] = useState([]);

  const click = useCallback((value: "offers" | "terms") => {
    setActive(value);
  }, []);

  const { title, buttonTitle } = useMemo(() => ({
    title: active === "offers" ? "Offers" : "Payment terms",
    buttonTitle: active === "offers" ? "New Offer" : "New Terms",
  }), [active]);

  const columns = useMemo<ColumnDef<TOffers>[]>(() => [
    { header: "", accessorKey: "status" },
    {
      id: "orderTitle",  // уникальный id колонки
      header: "Title",
      accessorFn: row => row.order?.title ?? "",
      cell: (info) => {
        const order =  info?.row?.original?.order;
        return (
          <div className={styles.firstCell}>
            <span className={styles.titleCell}>
              {order?.title}
            </span>
            <span className={styles.orderId}>
              ID {order?.id}
            </span>
          </div>
        );
      },
    },
    { header: "Sources", accessorKey: "sources" },
    { header: "Spend", accessorKey: "spend" },
    { header: "Profit", accessorKey: "profit" },
    {
      header: "Actions",
      accessorKey: "actions",
      cell: () => (
        <div className={stylesActions.actions}>
          <button className={stylesActions.eye}></button>
          <button className={stylesActions.edit}></button>
          <button className={stylesActions.trash}></button>
        </div>
      ),
    },
  ], [active]);

  const table = useReactTable({
    data: clientOffers,
    state:{
      columnFilters
    },
    columns,
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <section className={styles.panel}>
      <Info />
      <Switcher status={active} click={click} />
      <DataPanel table={table} title={title} buttonTitle={buttonTitle} columnFilters={columnFilters} setColumnFilters={setColumnFilters}/>
    </section>
  );
}

export default memo(Panel);
